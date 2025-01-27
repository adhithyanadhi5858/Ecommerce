const jwt = require("jsonwebtoken")
const cookieParsar = require("cookie-parser")
const AdmineModel = require("../moddels/admineModel")
const encryptKey = process.env.JWT_SECRET_KEY

const admineOnly = async (req,res,next)=>{

    const {token } = req.cookies;
            
            var decoded = jwt.verify(token,encryptKey)
            const User = await AdmineModel.findOne({id:decoded._id})

            console.log(User)
           
    if(!User.role =='admine'){
        return res.json({message:"you are not admine"})
    }
    req.user = User           
    next()
}

module.exports = {admineOnly}