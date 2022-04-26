const express=require('express');
const path=require('path')
const app= express();
const mongoose=require('mongoose');
try{
mongoose.connect('mongodb://127.0.0.1:27017/E-comm')
console.log('Database connected Sucessfully')
}
catch (error){
    console.log(error.message)
}

const config=require("./config/config")

// user Router
const user_route=require("./routes/userRoute")
app.use("/api",user_route);

// Store Route
const store_routes=require("./routes/storeRoute")
app.use("/api",store_routes )

app.listen(PORT, () =>{
    console.log(`server is runing on Port: ${PORT}`)
})