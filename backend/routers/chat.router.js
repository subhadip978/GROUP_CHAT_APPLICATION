const express=require('express');

const router=express.Router();
const {verifyToken}=require("../util/verifyToken");

const chatController=require("../controllers/chat.controller");

router.post("/chat",verifyToken,chatController.accessChat);
// router.post("/chat",verifyToken,chatController.createChat);
router.get("/chat",verifyToken,chatController.fetchChat);
router.post("/chat/group",verifyToken,chatController.createGroupChat);
router.put("/chat/rename",verifyToken,chatController.renameGroup);
router.put("/chat/remove",verifyToken,chatController.removeFromGroup);
router.put("/chat/addgroup",verifyToken,chatController.addToGroup);


module.exports=router;