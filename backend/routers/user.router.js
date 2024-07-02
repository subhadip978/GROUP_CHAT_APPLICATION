const express=require('express');
const router=express.Router();
const  { verifyToken }= require("../util/verifyToken");
const userController=require("../controllers/user.controller")


router.get("/user",verifyToken,userController.allUser);
module.exports=router;