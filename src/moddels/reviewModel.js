const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', 
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, 
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000, 
    },
  },
  { timestamps: true } 
);

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel
