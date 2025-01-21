
const ProductModel = require("../moddels/ProductModel")
const CartModel    = require("../moddels/cartModel")

const getAllProducts = async(req,res)=>{
   const limit=10
   const page =req.query.page || 1
   const skip = (page-1)*limit
   const searchVal = req.query.search || ""
    
    const allProducts = await ProductModel.find({title:{$regex: searchVal, $options: 'i'}})
    .skip(skip).limit(limit)

    res.json({allProducts})
}

const createProducts = async(req,res)=>{
    const newProduct = await ProductModel.create(req.body)

    res.json({newProduct})
}

const getProductById = async (req,res)=>{
    const Id= req.params.Id
    try{
        const product = await ProductModel.findById(Id)
        if(product){
            res.json({product})
        }else{
            res.json({message:"Product Not Found"})
        }
         
    }catch{
        res.json({message:"Products Not Found"})

    }
    
}

const addToCart = async (req,res)=>{
    const userId = req.user._id
    console.log(userId)
    const productId = req.body.productId
    const cartItem = await CartModel.create({
        productId :productId,
        userId:userId
    })

    const cartItemPopulated = await CartModel.findById(cartItem).populate("productId").populate("userId")

    res.json(cartItemPopulated)

}

const getAllCartItems = async (req,res)=>{
    const userId =req.user._id

    const cartItem =await CartModel.find({userId:userId}).populate("productId").populate("userId")

    res.json({cartItem})
}

module.exports = {getAllProducts,createProducts,getProductById,addToCart,getAllCartItems}