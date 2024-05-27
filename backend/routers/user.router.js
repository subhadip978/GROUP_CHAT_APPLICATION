const express=equire('express');
const router=express.router();

const userController=require("../controllers/user.controller")


router.get("/",userController.userAll);
module.exports=router;