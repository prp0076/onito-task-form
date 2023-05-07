const express = require("express");
const Router = express.Router();//router call yahi pr hora hai
Router.get('/user',(req,res)=>{
try {
   
    res.send([global.users])
} catch (error) {
    console.log(error.message);
    res.send("Server Error")
}
})
module.exports=Router