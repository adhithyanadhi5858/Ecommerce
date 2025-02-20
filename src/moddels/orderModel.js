const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  
    count :{type:String, default:1},
    productId :{type:mongoose.Schema.Types.ObjectId ,ref:"Product"},
    userId :{type:mongoose.Schema.Types.ObjectId ,ref:"User"},
    isPaid : Boolean,
    orderStatus : {type:String},  
  },
  { timestamps: true } 
);

  const OrderModel = mongoose.model('Order', OrderSchema);

  module.exports = OrderModel