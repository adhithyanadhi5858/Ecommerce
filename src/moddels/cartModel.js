const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    // product : [{
       productId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
       },
    //     price:{
    //       type:Number,
    //       required:true
    //     }
    // }],
    userId :{
      type:mongoose.Schema.Types.ObjectId ,
      ref:"User"
    },
    totalPrice:{
      type:Number,
      required:true,
      default:0
    }

  });


  // CartSchema.methods.calculateTotalPrice= function(){
  //     this.totalPrice = this.product.reduce((total,price)=>total+product.price,0)
  // }


  const CartModel = mongoose.model('Cart', CartSchema);

  module.exports = CartModel