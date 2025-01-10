const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const UserModel = require("../moddels/UserModel");
const saltRound = Number(process.env.SALT_ROUND)
const encryptKey = process.env.JWT_SECRET_KEY

const RegisterController = (req,res)=>{
    const userData = req.body

    bcrypt.hash(userData.password, saltRound, async function(err, hash) {
        if(hash){
            userData.password=hash
            const newUser = await UserModel.create(userData)
            res.json(newUser)
        }else{
            res.status(404).json({message:"Something Went Wrong"})
        }
    });

}


const LoginController= async(req,res)=>{

    console.log("Login User :", req.body)
    const user =  await UserModel.findOne({email:req.body.email})
   
    try{
        bcrypt.compare(req.body.password,user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ email: req.body.email }, encryptKey)
                res.json({token})
            }else{
                res.json({message:"Password Not Match"})
            }
        });
    }catch(err){
        res.status(401).json({message:"User not found"})
    }
    

}

module.exports = {RegisterController,LoginController}