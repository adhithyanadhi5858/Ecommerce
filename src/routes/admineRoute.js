const mongoose = require("mongoose")
const express = require("express")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const {admineLoginController, admineRegController,admineLogoutController} = require("../controller/admineController")
const router = express.Router()



router.post("/login",admineOnly,admineLoginController)

router.post("/register",admineRegController)

router.get('/logout',admineLogoutController)

module.exports = router