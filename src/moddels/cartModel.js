const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    count :{type:String, default:1},
    productId :{type:mongoose.Schema.Types.ObjectId ,ref:"Product"},
    userId :{type:mongoose.Schema.Types.ObjectId ,ref:"User"}

  });

  const CartModel = mongoose.model('Cart', CartSchema);

  module.exports = CartModel