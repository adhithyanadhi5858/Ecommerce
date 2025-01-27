
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
    const userId =req.user._id

    const cartItem =await CartModel.find({userId:userId}).populate("productId").populate("userId")

    res.json({cartItem})
}

const removeCartItems = (req,res)=>{


    res.json({message:"Dleted Cart Item"})
}

module.exports = {getAllCartItems,addToCart,removeCartItems}