const express=require("express");
const store_route=express();
const bodyParsher=require("body-parser");
store_route.use(bodyParsher.json());
store_route.use(bodyParsher.urlencoded({extended:true}));
const multer=require("multer");

const path=require("path")
store_route.use(express.static('public'));

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../Public/storeImages'),function(error,success){
            
            if(error) throw error;
        })
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(error,success){
            if(error) throw error;
        });
    }
})

const upload= multer({storage:storage})
const auth=require('../middleware/auth')
const storeController= require('../controller/storeController')

store_route.post('/create-store',auth,upload.single('logo'),storeController.create_store)

module.exports= store_route;