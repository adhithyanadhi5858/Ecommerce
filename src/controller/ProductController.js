
const productModel = require("../moddels/ProductModel")

const getAllProducts = async(req,res)=>{
    const allProducts = await productModel.find()
    res.json({allProducts})
}

const createProducts = async(req,res)=>{
    const newProduct = await productModel.create(req.body)

    res.json({newProduct})
}

module.exports = {getAllProducts,createProducts}