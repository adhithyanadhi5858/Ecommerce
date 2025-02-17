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
    const order = await OrderModel.findById(req.user._id).populate("userId").populate("productId"); 

    if (!order) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.json({order});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




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
      .populate("userId")
      .populate('productId');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createOrder, getOrderById, updateOrderStatus,getUserOrders, getAllOrders}
