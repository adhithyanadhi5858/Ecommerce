const OrderModel = require("../moddels/orderModel")
const ProductModel = require("../moddels/ProductModel")


const createOrder = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: 'No items in the order' });
    }

    const order = await OrderModel.create(data)
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}




const getOrderById = async (req, res) => {

  try {

    const order = await OrderModel.findById(req.params.id).populate('user', 'name email') .populate('orderItems.product', 'name price'); 

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);

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
    const orders = await Order.find({ user: req.user._id }).populate(
      'orderItems.product',
      'name price'
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createOrder, getOrderById, updateOrderStatus,getUserOrders, getAllOrders}
