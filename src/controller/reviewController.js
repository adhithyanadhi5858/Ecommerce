const ReviewModel = require("../moddels/reviewModel");
const ProductModel = require("../moddels/ProductModel");


const addReview = async (req, res) => {
  try {
    const data = req.body;

    const product = await ProductModel.findById(data.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   
    const existingReview = await ReviewModel.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = new ReviewModel.create(data)

 
    const reviews = await ReviewModel.find({ product: data.productId });

    const averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    product.rating = averageRating;
    product.numReviews = reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ product: productId })
      .populate('user', 'name') // Populate user details
      .sort({ createdAt: -1 }); // Sort by latest reviews

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

module.exports = { addReview, getReviewsForProduct, deleteReview,};
