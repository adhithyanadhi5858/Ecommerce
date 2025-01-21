const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const {RegisterController,LoginController,LogoutController,getUserProfile,checkRole} = require("../controller/userController")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const { authMiddleWare } = require("../middleware/authenticationMiddleware")


router.post("/register", RegisterController)

router.post("/login",LoginController)

router.get('/logout',LogoutController)

router.get('/profile', authMiddleWare, getUserProfile);

router.get("/check",authMiddleWare,checkRole)



module.exports = router