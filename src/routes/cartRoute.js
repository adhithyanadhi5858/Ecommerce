const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const { authMiddleWare } = require("../middleware/authenticationMiddleware")
const {addToCart,getAllCartItems,removeCartItems,  updateCart} = require("../controller/cartControllers")


router.post("/add-to-cart",authMiddleWare,addToCart)

router.get("/all-cart-items",authMiddleWare,getAllCartItems)

router.put("/update-cart-item",authMiddleWare,updateCart)

router.delete("/remove-cart-item",authMiddleWare,removeCartItems)



module.exports = router