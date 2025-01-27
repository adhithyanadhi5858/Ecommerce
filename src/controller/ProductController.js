
const ProductModel = require("../moddels/ProductModel")


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

    const productsDeatils = req.body

    try{

        if(!productsDeatils){
            return res.json({message:"Please Enter The Values"})
        }

        if(req.file){
            cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path)
        }

        productsDeatils.image = cloudinaryResponse

        const newProduct = await ProductModel.create(productsDeatils)
        res.json({newProduct})
        
      
    }catch(error){
         res.json({message:error.message || "something Went Wrong"})
    }
   
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
         
    }catch(error){
        res.json({message:error.message})

    }
    
}



const updateProducts = async (req,res)=>{
   
    try{

        const productId = req.params.id

        let product = await ProductModel.findById(productId)

        if(!product){
            return res.json({message:"Products Not found"})
        }

        const updates = req.body

        product = await ProductModel.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });

        res.json({message:"Update Product Successfullly",product})

    }catch(error){

        res.json({message:error.message || "somewhting went wrong"})

    }   
}



const deleteProducts = async(req,res)=>{

    try{
       const productId = req.params.id

       await ProductModel.findByIdAndDelete(productId)

       res.json({message:"Product Deleted"})

    }catch(error){

        res.json({message:error.message || "Something went wrong"})
    }
}


module.exports = {getAllProducts,createProducts,getProductById,updateProducts,deleteProducts}