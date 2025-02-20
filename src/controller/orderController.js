const OrderModel = require("../moddels/orderModel")
const ProductModel = require("../moddels/ProductModel")


const createOrder = async (req, res) => {
  try {

    const {productId,count,isPaid,orderStatus} = req.body

    const order = await OrderModel.create({

      userId:req.user._id,
      productId:productId,
      isPaid:isPaid,
      orderStatus:orderStatus,
      count:count

    })
    res.json({message:"Order Conformed",order})
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const getOrderById = async (req, res) => {
  try {
    // Query the orders for the logged-in user (using userId)
    const orders = await OrderModel.find({ userId: req.user._id })
      .populate('userId') // Populating user details (optional, depending on what you need)
      .populate('productId'); // Populating product details (optional, depending on what you need)

  

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json({ orders,message:"Fetched orders" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



const updateOrderStatus = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { status, isPaid } = req.body;

    if (status) {
      order.orderStatus = status;
    }

    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      order.paymentDate = isPaid ? Date.now() : null;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id
    const orders = await OrderModel.find({ userId:userId  }).populate("userId").populate("productId");

    res.json({orders});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate('productId',"title price image _id")
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createOrder, getOrderById, updateOrderStatus,getUserOrders, getAllOrders}
