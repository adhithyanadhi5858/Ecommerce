const mongoose = require("mongoose")

const WishlistSchema = new mongoose.Schema({
    
    productId :{type:mongoose.Schema.Types.ObjectId ,ref:"Product"},
    UsertId :{type:mongoose.Schema.Types.ObjectId ,ref:"User"}

  });

  const WishlistModel = mongoose.model('Wishlist', WishlistSchema);

  module.exports = WishlistModel