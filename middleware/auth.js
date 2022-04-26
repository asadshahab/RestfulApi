const jwt=require("jsonwebtoken")
const config=require("../config/config")


const verifyToken= async (req,res,next) =>{
    
        const token= req.body.token || req.query.token || req.headers["authorization"]
        try{
        if(!token){
            res.status(200).send({success:false, msg:"Token is not found"})
        }
     
        const decode= jwt.verify(token, config.secret_jwt)
        req.user=decode;
     
        return next();
    }
    catch(error){
        res.status(200).send({success:false, msg:"Invalid token"})
    }
}


module.exports= verifyToken;