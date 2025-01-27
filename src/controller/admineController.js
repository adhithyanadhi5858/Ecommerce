const bcrypt = require("bcrypt");
const AdmineModel = require("../moddels/admineModel");
const saltRound = Number(process.env.SALT_ROUND)
const tokenGenarate = require("../../token");

const admineRegController = async (req,res)=>{

    const userData = req.body

    const userExist = await AdmineModel.findOne({email:userData.email})

    if(userExist){
        return res.status(400).json({message:"User Already Exist"})
    }

    bcrypt.hash(userData.password, saltRound, async function(err, hash) {
        if(hash){
            userData.password=hash
            const newUser = await AdmineModel.create(userData)
           const regToken = tokenGenarate(newUser._id)
           res.cookie("token",regToken)
            res.json({message:"Admine SignUp Successfully completed"})
        }else{
            res.status(404).json({message:"Something Went Wrong"})
        }
    });

}

const admineLoginController= async(req,res)=>{
    const userData = req.user
    const user =  await AdmineModel.findOne({email:userData.email})
     
    
    if(!user){
        return res.json(400).json({message:"User Does Not Exist"})
    }
   
    try{
        bcrypt.compare(req.body.password,user.password, function(err, result) {
            if(result){
             res.json({message:"Admine Logged in successfully completed"})
             
            }else{
                res.json({message:"Password Not Match"})
            }
        });
    }catch(err){
        res.status(401).json({message:"User not found"})
    }
    

}

const admineLogoutController = (req,res)=>{
    try {
        res.clearCookie("token")
        res.json({message:"Admine Logout Successfully"})
    } catch (error) {
        res.json({message:"Something Went Wrong"})
    }
}

module.exports = {admineLoginController,admineRegController,admineLogoutController}