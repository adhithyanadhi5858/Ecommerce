
const cloudinaryInstance = require("../../config/cloudnary")
const ProductModel = require("../moddels/ProductModel")


const getAllProducts = async(req,res)=>{
   const limit=10
   const page =req.query.page || 1
   const skip = (page-1)*limit
   const searchVal = req.query.search || ""
    
    const allProducts = await ProductModel.find({title:{$regex: searchVal, $options: 'i'}})
    .skip(skip).limit(limit)

    res.json(allProducts)
}


const createProducts = async(req,res)=>{

    const {title,price,description,quantity} = req.body

    console.log("image===",req.file)

    try{

        if(!title || !description || !price ){
            return res.status(400),json({message:"all fields are required"})
        }  

            const cloudinaryResponse = cloudinaryInstance.uploader.upload(req.file.path)

            console.log("cldRes====",cloudinaryResponse)    

        const newProduct = await ProductModel({title,description,price,image:(await cloudinaryResponse).url,quantity})
        await newProduct.save()

        res.json({message:"Product Created",newProduct})
        
    }catch(error){
         res.json({message:error.message || "something Went Wrong"})
    }
}


const getProductById = async (req,res)=>{

    const productId= req.params.productId

    try{
        const product = await ProductModel.findById(productId)
        if(product){
            res.json({product})
        }else{
            res.json({message:"Product Unavailable"})
        }
         
    }catch(error){
        res.json({message:error.message})

    }
    
}



const updateProducts = async (req,res)=>{
   
    try{

        const productId = req.params.id

        let product = await ProductModel.findOne({_id:productId})

        if(!product){
            return res.json({message:"Products Not found"})
        }

        const updates = req.body

        product = await ProductModel.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        res.json({message:"Update Product Successfullly",product})

    }catch(error){

        res.json({message:error.message || "somewhting went wrong"})

    }   
}



const deleteProducts = async(req,res)=>{

    try{

        const productId = req.params.id
        console.log(productId)
      

       await ProductModel.findByIdAndDelete(productId)

       res.json({message:"Product Deleted"})

    }catch(error){

        res.json({message:error.message || "Something went wrong"})
    }
}


module.exports = {getAllProducts,createProducts,getProductById,updateProducts,deleteProducts}