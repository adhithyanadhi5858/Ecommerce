const jwt = require("jsonwebtoken");
const AdmineModel = require("../moddels/admineModel");
const encryptKey = process.env.JWT_SECRET_KEY

const admineOnly = async (req, res, next) => {

    const { token } = req.cookies;


    try {

        const { token } = req.cookies;

        var decoded = jwt.verify(token, encryptKey)
        const admine = await AdmineModel.findOne({ id: decoded._id })
        if (admine.role == "admine") {
            req.user = admine
            next()
        }else{
            res.json({message:"Admine Not Authorized"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Invalid Token" })

    }

}

module.exports = { admineOnly }