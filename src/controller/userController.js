const bcrypt = require("bcrypt");
const UserModel = require("../moddels/UserModel");
const tokenGenarate = require("../../token");
const saltRound = Number(process.env.SALT_ROUND)
const NODE_ENV = process.env.NODE_ENV;


const RegisterController = async (req, res) => {

    const userData = req.body

    const userExist = await UserModel.findOne({ email: userData.email })

    if (userExist) {
        return res.status(401).json({ message: "User Already Exist" })
    }

    bcrypt.hash(userData.password, saltRound, async function (err, hash) {
        if (hash) {
            userData.password = hash
            const newUser = await UserModel.create(userData)
            const regToken = tokenGenarate(newUser._id)
            res.cookie("token", regToken,{
                sameSite: NODE_ENV === "production" ? "None" : "Lax",
                secure: NODE_ENV === "production",
                httpOnly: NODE_ENV === "production",
            })
            delete newUser._doc.password
            res.json({ newUser, message: "User SignUp Successfully completed" })
        } else {
            res.status(404).json({ message: "Something Went Wrong" })
        }
    });

}


const LoginController = async (req, res) => {

    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
       return res.json({ message: "User Does Not Exist" })
    }

    try {
        const checkData =  bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (!result) {
                return res.status(400).json({ message: "Invalid credentials" });

            } else {                
                const token = tokenGenarate(user._id)
                res.cookie("token", token,{
                    sameSite: NODE_ENV === "production" ? "None" : "Lax",
                    secure: NODE_ENV === "production",
                    httpOnly: NODE_ENV === "production",
                })
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
        res.clearCookie("token",{
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        })
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
        image:user.image
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

    const userId = req.params.userId
    try {
        await UserModel.findByIdAndDelete(req.params.userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

const editProfile = async (req, res) => {
    const { name, email, phone } = req.body;
    let image = req.body.image; // If the user doesn't upload an image, we'll use the old one.
  
    if (req.file) {
      image = req.file.path; // Save the image path if a new image was uploaded
    }
  
    try {

      const user = await UserModel.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.image = image || user.image;
  
      await user.save();
      res.json(user); // Send the updated user data back
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  };





module.exports = { RegisterController, LoginController, LogoutController, getUserProfile, checkUser ,getAllUsers,deleteUser,editProfile}