const jwt =require ("jsonwebtoken")

 const verifyToken=async(req,res,next)=>{
    // console.log(req.headers.token)
    
    if(req.headers.token==undefined)return res.send({status:false,message:"Please Login "})
    const token=req.headers.token
    if(!token) return res.send({status:false,message:"You are not authenticated!!"})
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err)return res.send({status:false,message:"You are not authorised!!"}) 
        if(user){
            req.userId=user.id
            next()

        }
    })
}
module.exports = {verifyToken}
