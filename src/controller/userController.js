const bcrypt = require("bcrypt");
const UserModel = require("../moddels/UserModel");
const tokenGenarate = require("../../token");
const saltRound = Number(process.env.SALT_ROUND)


const RegisterController = async (req,res)=>{
    const userData = req.body

    const userExist = await UserModel.findOne({email:userData.email})

    if(userExist){
        return res.status(400).json({message:"User Already Exist"})
    }

    bcrypt.hash(userData.password, saltRound, async function(err, hash) {
        if(hash){
            userData.password=hash
            const newUser = await UserModel.create(userData)
           const regToken = tokenGenarate(newUser._id)
           res.cookie("token",regToken)
            res.json({message:"User SignUp Successfully completed"})
        }else{
            res.status(404).json({message:"Something Went Wrong"})
        }
    });

}


const LoginController= async(req,res)=>{

    console.log("Login User :", req.body)
    const user =  await UserModel.findOne({email:req.body.email})

    if(!user){
        return res.json(400).json({message:"User Does Not Exist"})
    }
   
    try{
        bcrypt.compare(req.body.password,user.password, function(err, result) {
            if(result){
             res.json({message:"User Logged in successfully completed"})
            }else{
                res.json({message:"Password Not Match"})
            }
        });
    }catch(err){
        res.status(401).json({message:"User not found"})
    }
    

}


const LogoutController = (req,res)=>{
    try {
        res.clearCookie("token")
        res.json({message:"Logout Successfully"})
    } catch (error) {
        res.json({message:"Something Went Wrong"})
    }
}

const getUserProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const checkRole = async (req, res) => {
    const user = req.user;
  
    if (user.role === 'admin') {
      res.status(200).json({ message: 'You are an admin' });
    } else {
      res.status(403).json({ message: 'You are not an admin' });
    }
  };
  



module.exports = {RegisterController,LoginController,LogoutController,getUserProfile,checkRole}