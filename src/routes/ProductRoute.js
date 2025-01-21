const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const {getAllProducts,createProducts,getProductById, addToCart,getAllCartItems} = require("../controller/ProductController")
const { authMiddleWare } = require("../middleware/authenticationMiddleware")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")

router.get("/all-products",getAllProducts)

router.post("/create-products",authMiddleWare ,admineOnly ,createProducts)

router.post("/add-to-cart",authMiddleWare,addToCart)

router.get("/cart-items",authMiddleWare,getAllCartItems)

router.get("/:Id",getProductById)

module.exports = router