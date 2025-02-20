
const cloudinaryInstance = require("../../config/cloudnary")
const ProductModel = require("../moddels/ProductModel")


const getAllProducts = async(req,res)=>{
   const limit=20
   const page =req.query.page || 1
   const skip = (page-1)*limit
   const searchVal = req.query.search || ""
    
    const allProducts = await ProductModel.find({title:{$regex: searchVal, $options: 'i'}})
    .skip(skip).limit(limit)

    res.json(allProducts)
}

const admineAllProducts = async(req,res)=>{
     
     const allProducts = await ProductModel.find()

     res.json(allProducts)
 }


const createProducts = async(req,res)=>{

    const {title,price,description,quantity} = req.body

    

    try{

        if(!title || !description || !price ){
            return res.status(400),json({message:"all fields are required"})
        }  

            const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path)

                

        const newProduct = await ProductModel({title,description,price,image:(await cloudinaryResponse).url,quantity})
        await newProduct.save()

        

        res.json({message:"Product Created",newProduct})
        
    }catch(error){
         res.json({message:error.message || "internal server error"})
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
   
    try {
        
        const { title, price, description, quantity } = req.body;
        let product = await ProductModel.findById(req.params.productId);
    
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
    
        let imageUrl = product.image; // Keep existing image if no new upload
    
        // Upload new image if provided
        if (req.file) {
          const result = await cloudinary.uploader.upload_stream(
            { folder: "products" },
            async (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ message: "Image upload failed" });
              }
              imageUrl = result.secure_url;
    
              // Update product
              product = await ProductModel.findByIdAndUpdate(
                req.params.id,
                { title, price, description, stock, image: imageUrl },
                { new: true }
              );
    
              res.json({ message: "Product updated successfully", product });
            }
          ).end(req.file.buffer);
        } else {
          // If no new image, update other fields
         const product = await ProductModel.findByIdAndUpdate(
            req.params.productId,
            { title, price, description, quantity },
            { new: true }
          );
    
          res.json({ message: "Product updated successfully", product });
        }
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
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


module.exports = {getAllProducts,createProducts,getProductById,updateProducts,deleteProducts,admineAllProducts}