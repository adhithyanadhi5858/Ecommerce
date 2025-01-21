var jwt = require('jsonwebtoken');
const encryptKey = process.env.JWT_SECRET_KEY

const tokenGenarate = (id)=>{
try {

    var token = jwt.sign({id: id }, encryptKey)

    return token

} catch (error) {
    console.log(error)
}
    
}

module.exports = tokenGenarate
