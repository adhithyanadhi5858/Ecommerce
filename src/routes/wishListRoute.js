const mongoose = require("mongoose")
const express = require("express")
const { addToWishList, getWishList, deleteWhishList } = require("../controller/whishListController")
const { authMiddleWare } = require("../middleware/authenticationMiddleware")
const router = express.Router()


router.post("/add-to-whish-list",authMiddleWare,addToWishList)

router.delete("/delete/:id",authMiddleWare,deleteWhishList)

router.get("/all-whish-list",authMiddleWare,getWishList)


module.exports = router