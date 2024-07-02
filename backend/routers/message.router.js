
const express=require('express');
const router=express.Router();

const {verifyToken}=require('../util/verifyToken');
const sendMessageController=require("../controllers/message.controller")

router.post('/message',verifyToken,sendMessageController.sendMessage);
// router.get("/message",verifyToken,sendMessageController.fetchChat);
router.get('/message/:chatId',verifyToken,sendMessageController.allMessages);


module.exports= router;