const mongoose = require("mongoose")
const express = require("express")
const multer  = require('multer')
const { admineOnly } = require("../middleware/admineOnlyMiddleware.js")
const router = express.Router()
const upload = require("../middleware/multer.js")
const {getAllProducts,createProducts,deleteProducts,updateProducts, getProductById} = require("../controller/ProductController.js")



router.get("/all-products",getAllProducts)

router.post("/create-products",admineOnly, upload.single("image") ,createProducts)

router.get("/product-details/:productId",getProductById)

router.delete("/delete/:id",admineOnly,deleteProducts)

router.put("/update/:id",admineOnly,updateProducts)

module.exports = router