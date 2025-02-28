const CartModel = require('../moddels/cartModel');
const OrderModel = require('../moddels/orderModel');
const Stripe = require('stripe')
const client_domain = process.env.CLIENT_DOMAIN;
const stripe = new Stripe(process.env.Stripe_Private_Api_Key)


const payment = async (req, res) => {
    try {

        const userId = req.user.id;

        const { products } = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product?.title,
                    images: [product?.image],
                },
                unit_amount: Math.round(product?.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });


        const newOrder = new OrderModel({ userId,productId:products.map(product => {
            return product?.id || product?._id; // Handling different ID structures
        }),
        orderStatus:"shipped",
        sessionId: session?.id });
        await newOrder.save()

        res.json({ message: "Successfull", success: true, sessionId: session.id });

       const clearCart = await CartModel.deleteMany({ userId: userId });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}



const getPayment = async (req, res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        console.log("session=====", session);

        res.send({
            status: session?.status,
            customer_email: session?.customer_details?.email,
            session_data: session,
        });
    } catch (error) {
        res.status(error?.statusCode || 500).json(error.message || "internal server error");
    }
}

module.exports = { getPayment, payment }