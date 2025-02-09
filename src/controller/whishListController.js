const CartModel = require("../moddels/cartModel")
const WishlistModel = require("../moddels/wishlistModel")

const addToWishList = (req,res)=>{

    try{
        const userId = req.user._id

        const productId = req.body.productId

        const product = WishlistModel.create({
           productId : productId,
           UserId : userId
        })
        res.json({message:"Wish-List Added Successfully"})

    }catch(error){

        res.json({message:error.message} || "something went wrong")

    }

}

const getWishList = async (req,res)=>{
    try{

        const userId = req.user._id

        const WhishList = await  WishlistModel.find({UserId:userId}).populate('UserId').populate('productId')


        res.json({WhishList})

    }catch(error){

        res.json({message:error.message} || "something went wrong")
    }
}


const deleteWhishList = async (req,res)=>{
   
   try{
    const id = req.params.id

    const deleted = await WishlistModel.findByIdAndDelete(id)

    res.json({message:"Item Deleted From Your Whish List"})
   }catch(error){
    res.json({message:error.message})
   }

}

module.exports = {addToWishList,getWishList,deleteWhishList}