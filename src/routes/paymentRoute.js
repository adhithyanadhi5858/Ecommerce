const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const { authMiddleWare } = require("../middleware/authenticationMiddleware")
const { payment, getPayment } = require("../controller/paymentController")


router.post("/create-checkout-session",authMiddleWare,payment)
router.get("/session-status",authMiddleWare,getPayment)

module.exports = router