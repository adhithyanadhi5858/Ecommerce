

const admineOnly =(req,res,next)=>{

    const user = req.body

    if(!user.role =='admine'){
        return res.json({message:"you are not admine"})
    }else{
        req.user=user
        next()
    }
}

module.exports = {admineOnly}