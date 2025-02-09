const jwt = require("jsonwebtoken")
const encryptKey = process.env.JWT_SECRET_KEY

const admineOnly = async (req,res,next)=>{

    const {token } = req.cookies;
            
    try {
        const decoded = jwt.verify(token, encryptKey);
        if (decoded.role !== 'admine') {
            return res.status(403).json({ message: 'Not authorized' });
        }else{
            
        }
            
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message:error.message || 'Invalid token' });
    }
           
   
    req.user = admine          
    next()
}

module.exports = {admineOnly}