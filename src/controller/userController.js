const bcrypt = require("bcrypt");
const UserModel = require("../moddels/UserModel");
const tokenGenarate = require("../../token");
const saltRound = Number(process.env.SALT_ROUND)


const RegisterController = async (req, res) => {

    const userData = req.body
    console.log(userData)

    const userExist = await UserModel.findOne({ email: userData.email })

    if (userExist) {
        return res.status(400).json({ message: "User Already Exist" })
    }

    bcrypt.hash(userData.password, saltRound, async function (err, hash) {
        if (hash) {
            userData.password = hash
            const newUser = await UserModel.create(userData)
            const regToken = tokenGenarate(newUser._id)
            res.cookie("token", regToken)
            delete newUser._doc.password
            res.json({ newUser, message: "User SignUp Successfully completed" })
        } else {
            res.status(404).json({ message: "Something Went Wrong" })
        }
    });

}


const LoginController = async (req, res) => {

    const user = await UserModel.findOne({ email: req.body.email })

    console.log(user)

    if (!user) {
       return res.status(400).json({ message: "User Does Not Exist" })
    }

    try {
         checkData =  await bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (!result) {
                return res.status(400).json({ message: "Invalid credentials" });

            } else {
                const token = tokenGenarate(user._id)
                res.cookie("token", token)
                delete user._doc.password
                res.json({ user, message: "User Logged in successfully completed" })
            }
        });
    } catch (err) {
        res.status(401).json({ message: "User not found" })
    }


}


const LogoutController = (req, res) => {
    try {
        res.clearCookie("token")
        res.json({ message: "Logout Successfully" })
    } catch (error) {
        res.json({ message: "Something Went Wrong" })
    }
}

const getUserProfile = async (req, res) => {

    const user = req.user;

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
    });
};

const checkUser = async (req, res) => {

    const user = req.user;

    try{

       res.json({user,message:"User Autharized"})

    }catch(error){

        res.json({message:error.message || "Internal Server Error"})

    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};




module.exports = { RegisterController, LoginController, LogoutController, getUserProfile, checkUser ,getAllUsers,deleteUser}