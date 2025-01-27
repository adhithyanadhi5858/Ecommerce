const mongoose = require("mongoose")
const express = require("express")
const { addToWishList, getWishList } = require("../controller/whishListController")
const router = express.Router()


router.post("/add-to-wish-list",addToWishList)

router.get("/all-wish-list",getWishList)

module.exports = router