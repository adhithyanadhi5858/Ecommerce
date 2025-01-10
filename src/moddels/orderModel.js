const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    count :{type:String, default:1},
    productId :{type:mongoose.Schema.Type.ObjectId ,ref:"Product"},
    UsertId :{type:mongoose.Schema.Type.ObjectId ,ref:"User"},
    isPaid : Boolean,
    OrderStatus : {type:String},



  });

  const OrderModel = mongoose.model('Order', OrderSchema);

  module.exports = OrderModel