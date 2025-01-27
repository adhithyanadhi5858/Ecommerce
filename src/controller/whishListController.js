const WishlistModel = require("../moddels/wishlistModel")

const addToWishList = (req,res)=>{

    try{
        const userId = req.user._id
        const productId = req.body.productId
        const product = WishlistModel.create({
           productId : productId,
           UsertId : userId
        })
        res.json({message:"Wish-List Added Successfully"})

    }catch(error){

        res.json({message:error.message} || "something went wrong")

    }

}

const getWishList = async (req,res)=>{

    try{
        const userId = req.user._id

        const products = WishlistModel.find({UsertId:userId}).populate('userId').populate('productId')

        res.json({products})


    }catch(error){

        res.json({message:error.message} || "something went wrong")

    }


}

module.exports = {addToWishList,getWishList}