const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title:{type:String},
    price :{type:String},
    description :{type:String},
    image :{type:String},
    quantity :{type:Number , default:0},

  });

  const ProductModel = mongoose.model('Product', ProductSchema);

  module.exports=ProductModel