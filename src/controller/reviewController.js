const ReviewModel = require("../moddels/reviewModel");
const ProductModel = require("../moddels/ProductModel");


const addReview = async (req, res) => {

  try {
    const { productId, comment, rating } = req.body;
    userId = req.user._id
    
    if (!productId || !comment || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new ReviewModel({
      productId,
      userId, // Assuming you're using authentication
      comment,
      rating,
    });

    await newReview.save();

    res.status(201).json({ message: "Review added successfully!" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



const getReviewsForProduct = async (req, res) => {

  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const reviews = await ReviewModel.find({ productId }).populate("userId", "name");

    res.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server Error" });
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
