const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    count :{type:String, default:1},
    productId :{type:mongoose.Schema.Types.ObjectId ,ref:"Product"},
    usertId :{type:mongoose.Schema.Types.ObjectId ,ref:"User"},
    isPaid : Boolean,
    orderStatus : {type:String},



  });

  const OrderModel = mongoose.model('Order', OrderSchema);

  module.exports = OrderModel