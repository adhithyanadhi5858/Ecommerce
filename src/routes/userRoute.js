const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const {RegisterController,LoginController,LogoutController,getUserProfile,checkUser, getAllUsers, deleteUser} = require("../controller/userController")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const { authMiddleWare } = require("../middleware/authenticationMiddleware")


router.post("/register", RegisterController)

router.post("/login",LoginController)

router.get('/logout',LogoutController)

router.get('/profile', authMiddleWare, getUserProfile);

router.get("/check",authMiddleWare,checkUser)

router.get("/get-all-users",admineOnly,getAllUsers)

router.delete("/delete/:userId",authMiddleWare,deleteUser)



module.exports = router