const User= require("../model/userModel");
const bcrypt=require("bcryptjs");
const bcryptjs = require("bcryptjs");
const jwt=require("jsonwebtoken")
const config=require("../config/config")

// create jwt 

const create_token= async (id) =>{
    const token= await jwt.sign({_id:id}, config.secret_jwt)
    return token;
}

// code for securepassword
const securepassword= async(password) =>{

    const passwordHash= await bcryptjs.hash(password,10);
    return passwordHash;
}
const registerUser = async (req,res) =>{
   
    const spassword=  await securepassword(req.body.password)
    const user= new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        image:req.file.filename,
        password:spassword,
        type:req.body.type
    })

    const userData=await User.findOne({email:req.body.email})
    if (userData) {
        res.status(200).send({success:false, msg:"E-mail already exist"})
        
    } else {
        const user_data= await user.save();
       
        res.status(200).send({sucess:true, msg:"User creatd sucessfully", user:user_data})
        
    }
}

const user_login= async (req,res) =>{
     
    const Email= req.body.email
    const Password=req.body.password
   const userData= await User.findOne({email:Email})
    if(userData){
        const passwordMatch= await bcryptjs.compare(Password,userData.password)
        const tokenData= await create_token(userData._id)
        console.log(passwordMatch)
        if (passwordMatch) {
                const Userresult={
                    _id:userData._id,
                    nama:userData.name,
                    email:userData.email,
                    mobile:userData.mobile,
                    password:userData.password,
                    image:userData.image,
                    type:userData.type,
                    token:tokenData,

                }
                const response={
                    success:true,
                    msg:"user login successfully",
                    data: Userresult
                }
                res.status(200).send(response)
        } else {

             res.status(200).send({sucess:false, msg:"Password is Incorrect"})
        }
    }
    else{
        res.status(200).send({sucess:false, msg:"E-mail is Incorrect"})
    }

}


module.exports={
    registerUser,
    user_login,

}
