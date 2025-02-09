const mongoose = require("mongoose")
const express = require("express")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const {admineLoginController, admineRegController,admineLogoutController, getAdmineProfile} = require("../controller/admineController")
const router = express.Router()


router.post("/login",admineLoginController)

router.post("/register",admineRegController)

router.get('/logout',admineLogoutController)

router.get("/profile",admineOnly,getAdmineProfile)





module.exports = router