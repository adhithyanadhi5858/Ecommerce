const ReviewModel = require("../moddels/reviewModel");
const ProductModel = require("../moddels/ProductModel");


const addReview = async (req, res) => {

  try {
    const { productId , comment,rating } = req.body   

    const product = await ProductModel.findById(productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingReview = await ReviewModel.findOne({
      userId: req.user._id,
      productid: productId,
    });

    if (!existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await ReviewModel.create({
      userId: req.user._id,
      productId: productId,
      rating:rating,
      comment: comment
    })

    console.log(review)

    
    if(!review){
      return res,josn({
        message:"Server Error"
      })
    }

    res.status(201).json({ message: 'Review added successfully', review });

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};



const getReviewsForProduct = async (req, res) => {

  try {
    const { productId } = req.params.productId
    const comment = req.body

    const reviews = await ReviewModel.findOne({
      userId: req.user._id,
      productid: productId,
    }).populate("user")


    res.json(reviews);

  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};




const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await ReviewModel.findByIdAndDelete(id);

    res.json({ message: 'Review deleted successfully' });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};

module.exports = { addReview, getReviewsForProduct, deleteReview, };
