const jwt=require('jsonwebtoken')
const User=require('../models/users')


const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        // replace Bearer with empty string token is passed as a string
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        //console.log("Helllo")
        //console.log(decode._id)
        const user=await User.findOne({_id:decode._id,'tokens.token':token}) // check if the token exist return only if the token exist
        console.log("Hi ",user)
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error:'Please Authenticate'})
    }
}

module.exports=auth