const mongoose = require("mongoose")
const express = require("express")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const {admineLoginController, admineRegController,admineLogoutController, getAdmineProfile, getAdminDashboard, checkAdmine} = require("../controller/admineController")
const router = express.Router()


router.post("/login",admineLoginController)

router.post("/register",admineRegController)

router.get('/logout',admineLogoutController)

router.get("/profile",admineOnly,getAdmineProfile)

router.get("/admine-dashboard",admineOnly,getAdminDashboard)

router.get("/check",admineOnly,checkAdmine)



module.exports = router