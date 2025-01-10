const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const {getAllProducts,createProducts} = require("../controller/ProductController")

router.get("/all-products",getAllProducts)

router.post("/create-products",createProducts)

module.exports = router