
const CartModel    = require("../moddels/cartModel")


const addToCart = async (req,res)=>{

    try{
        const userId = req.user._id
        const productId = req.body.productId
        
        const cartItem = await CartModel.create({
            productId :productId,
            userId:userId
        })

        const cartItemPopulated = await CartModel.findById(cartItem).populate("productId").populate("userId")
        res.json(cartItemPopulated)

    }catch(error){
        res.json({message:error.message || "something went wrong"})
    }
   
}

const getAllCartItems = async (req,res)=>{
    
    const userId = req.user._id

    const cartItem =await CartModel.find({userId:userId}).populate("productId").populate("userId")

    res.json({cartItem})
}

const removeCartItems = async (req,res)=>{

   try{
    const productId = req.body.productId

    const product = await CartModel.findByIdAndDelete(productId)


    res.json({message:"Deleted Cart Item"})

   }catch(error){
      res.status(404).json({message:error.message || "Server Error"})
   }
}

module.exports = {getAllCartItems,addToCart,removeCartItems}