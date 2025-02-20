const mongoose = require("mongoose")
const express = require("express")
const multer  = require('multer')
const { admineOnly } = require("../middleware/admineOnlyMiddleware.js")
const router = express.Router()
const upload = require("../middleware/multer.js")
const {getAllProducts,createProducts,deleteProducts,updateProducts, getProductById, admineAllProducts} = require("../controller/ProductController.js")



router.get("/all-products",getAllProducts)

router.get("/admine-all-products",admineOnly,admineAllProducts)

router.post("/create-products",admineOnly, upload.single("image") ,createProducts)

router.get("/product-details/:productId",getProductById)

router.delete("/delete/:id",admineOnly,deleteProducts)

router.put("/update/:productId",admineOnly,upload.single("image"),updateProducts)



module.exports = router