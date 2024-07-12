const multer = require('multer');
const path = require('path');
const express=require('express');
const router=express.Router();
const fs=require("fs");

const {verifyToken}=require('../util/verifyToken');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir); 
  }

  const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, uploadDir); 
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + '-' + file.originalname);
	}
  });


const upload = multer({
	storage: storage,
   
});


const sendMessageController=require("../controllers/message.controller")

router.post('/message',upload.single('file'),verifyToken,sendMessageController.sendFile);
// router.get("/message",verifyToken,sendMessageController.fetchChat);
router.get('/message/:chatId',verifyToken,sendMessageController.allMessages);


module.exports= router;