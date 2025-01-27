const mongoose = require("mongoose")
const express = require("express")
const multer  = require('multer')
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const { upload } = require("../middleware/multer")
const router = express.Router()
const {getAllProducts,createProducts,deleteProducts,updateProducts} = require("../controller/ProductController")



router.get("/all-products",getAllProducts)

router.post("/create-products",admineOnly,upload.single("image") ,createProducts)

router.delete("/delete/:id",admineOnly,deleteProducts)

router.put("/update/:id",admineOnly,upload.single("image"),updateProducts)

module.exports = router