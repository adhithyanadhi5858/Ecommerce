const bcrypt = require("bcrypt");
const AdmineModel = require("../moddels/admineModel");
const saltRound = Number(process.env.SALT_ROUND)
const tokenGenarate = require("../../token");
const UserModel = require("../moddels/UserModel.js");
const ProductModel = require("../moddels/ProductModel.js");
const OrderModel = require("../moddels/orderModel.js");

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

    const userData = req.body

    const user =  await AdmineModel.findOne({email:userData.email})
     
    
    if(!user){
        return res.json(400).json({message:"User Does Not Exist"})
    }
   
    try{
        bcrypt.compare(req.body.password,user.password, function(err, result) {

            if(result){
            
             const regToken = tokenGenarate(user._id)
             res.cookie("token",regToken)
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


const getAdmineProfile = async (req, res) => {

    const admine = req.user;
    
    res.status(200).json({
        id: admine._id,
        name: admine.name,
        email: admine.email,
    });
};

const checkAdmine = async (req, res) => {

    const admine = req.user;

    try{

       res.json({admine,message:"Admine Autharized"})

    }catch(error){

        res.json({message:error.message || "Internal Server Error"})

    }
};


// Admin Dashboard Controller
const getAdminDashboard = async (req, res) => {
    try {
        // Fetch total counts
        const totalUsers = await UserModel.countDocuments();
        const totalProducts = await ProductModel.countDocuments();
        const totalOrders = await OrderModel.countDocuments();
        
        // Aggregate order stats (Total Sales, Pending Orders, Delivered Orders)
        const totalSales = await OrderModel.aggregate([
            { $match: { status: "Delivered" } }, // Only count delivered orders
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const pendingOrders = await OrderModel.countDocuments({ status: "Pending" });
        const deliveredOrders = await OrderModel.countDocuments({ status: "Delivered" });

        // Response
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalSales: totalSales[0]?.total || 0,
                pendingOrders,
                deliveredOrders,
            },
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = {admineLoginController,admineRegController,admineLogoutController,getAdmineProfile,getAdminDashboard,checkAdmine}