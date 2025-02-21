const jwt = require("jsonwebtoken");
const AdmineModel = require("../moddels/admineModel");
const encryptKey = process.env.JWT_SECRET_KEY

const admineOnly = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        var decoded = jwt.verify(token, encryptKey)
        const admine = await AdmineModel.findById(decoded.id)       
        if (admine) {
            req.user = admine
            next()
        }else{
            return res.json({message:"Admine Not Authorized"})
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid Token" })

    }

}

module.exports = { admineOnly }