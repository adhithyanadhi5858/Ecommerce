const mongoose = require("mongoose")
const express = require("express")
const { admineOnly } = require("../middleware/admineOnlyMiddleware")
const {admineLoginController, admineRegController,admineLogoutController, getAdmineProfile, getAdminDashboard, checkAdmine, updateProfile} = require("../controller/admineController")
const upload = require("../middleware/multer")
const router = express.Router()


router.post("/login",admineLoginController)

router.post("/register",admineRegController)

router.get('/logout',admineLogoutController)

router.get("/profile",admineOnly,getAdmineProfile)

router.get("/admine-dashboard",admineOnly,getAdminDashboard)

router.get("/check",admineOnly,checkAdmine)

router.put("/update-profile", admineOnly, upload.single("image"),updateProfile)



module.exports = router