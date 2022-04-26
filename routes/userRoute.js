const express= require("express");
const user_router=express();

const bodyParser=require("body-parser")
 user_router.use(bodyParser.json())
 user_router.use(bodyParser.urlencoded({extended:true}));

 const multer=require("multer");
const path = require("path");
user_router.use(express.static("public"));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/userImage"), function(error,sucess){
            if(error){
                throw error;
            }
        })
    },
    filename:function(req,file,cb){
        const name= Date.now()+'-'+file.originalname;
        cb(null,name, function(error1,sucess1){
            if(error1)
            throw error1;
        })
    }
})

const upload=multer({storage:storage})

const user_Controller= require("../controller/userController");
const { append } = require("express/lib/response");
const auth=require("../middleware/auth")

user_router.post("/register",upload.single("image"),user_Controller.registerUser)
user_router.post("/login", user_Controller.user_login)

user_router.get('/testauth',auth, function(req,res){
    res.status(200).send({success:true, msg:"Authenicated User"})
})

module.exports= user_router
