
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
        res.json({cartItemPopulated,message:"Added To Cart"})

    }catch(error){
        res.json({message:error.message || "something went wrong"})
    }
   
}

const getAllCartItems = async (req,res)=>{
    
    const userId = req.user._id

    const cartItem =await CartModel.find({userId:userId}).populate("productId").populate("userId")

    res.json(cartItem)
}

const removeCartItems = async (req, res) => {
    try {
      const { cartId } = req.body; // Extract cartId from body
  
      if (!cartId) {
        return res.status(400).json({ message: "Cart Item Not Found" });
      }
  
      const deletedProduct = await CartModel.findByIdAndDelete(cartId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      res.json({ message: "Deleted Cart Item Successfully" });
  
    } catch (error) {
      res.status(500).json({ message: error.message || "Server Error" });
    }
  };

module.exports = {getAllCartItems,addToCart,removeCartItems}