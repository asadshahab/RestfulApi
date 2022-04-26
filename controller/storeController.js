const User=require("../model/userModel")
const Store=require("../model/storeModel")

const create_store= async(req,res) =>{

    try {
        const userData= await User.findOne({_id:req.body.vendor_id});    
        if(userData){
            if(!req.body.latitude || !req.body.longitude){
                res.status(200).send({success:false, msg:"Location is Important"})
            }
            else{
                const vedorData= await Store.findOne({vendor_id:req.body.vendor_id})
                if(vedorData){
                    res.status(200).send({success:false,msg:"this vendor is already created a store"})
                }
                else{
                    const store= new Store({
                        vendor_id:req.body.vendor_id,
                        logo:req.file.filename,
                        business_email:req.body.business_email,
                        address:req.body.address,
                        pin:req.body.pin,
                        location:{
                            type:"Point",
                            coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                        }
                    });
                    console.log(store)
                     const storeData= await store.save();
                     res.status(200).send({success:true,msg:"Store Created successfuly", data:storeData})
                }
            }
        }
        else{
            res.status(200).send({success:false,msg:"Vendor iD is not Exist"})
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports={
    create_store,
}