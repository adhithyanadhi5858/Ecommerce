const express = require('express');
const router = express.Router();

const { addReview, getReviewsForProduct, deleteReview,} = require("../controller/reviewController");
const { authMiddleWare } = require('../middleware/authenticationMiddleware');



router.post('/add-review', authMiddleWare, addReview);


router.get('/get-review/:productId', authMiddleWare,getReviewsForProduct);


router.delete('/delete-review/:id', authMiddleWare, deleteReview);

module.exports = router;
