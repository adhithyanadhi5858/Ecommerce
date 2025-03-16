const jwt = require("jsonwebtoken")
const cookieParsar = require("cookie-parser")
const UserModel = require("../moddels/UserModel")
const encryptKey = process.env.JWT_SECRET_KEY

const authMiddleWare = async (req,res,next)=>{
    
        try{

            const {token } = req.cookies;

            if(!token){
              return   res.status(401).json({message:"User Not Authenticated"})
            }
            
            var decoded = jwt.verify(token,encryptKey)
            const User = await UserModel.findById(decoded.id)
            req.user = User   
            next()
        }catch(error){
            console.log(error)
            res.status(401).json({message:"Invalid Token"})
            
        }
    
}

module.exports ={authMiddleWare}