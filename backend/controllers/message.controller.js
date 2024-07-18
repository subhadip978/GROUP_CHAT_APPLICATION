const Message=require("../models/message");
const User=require("../models/user");
const Chat=require("../models/chat");
const {S3Client , PutObjectCommand ,GetObjectCommand} = require("@aws-sdk/client-s3");
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner");
const fs=require("fs");






exports.allMessages=async(req,res)=>{


	try{

		const message=await Message.findAll({
			where:{chatId:req.params.chatId},
			include:[
				{
					model:User,
					as:'sender'
				},
				{
					model:Chat,
					as:'chat'
				}

			]
		})

		res.status(200).json(message);

	}catch(err)
{
	console.log(err);
	res.status(500).json(err);

}}







exports.sendFile = async (req, res) => {
    const { content, chatId } = req.body;
    let fileurl = null;

    try {

        if (req.file) {
            console.log(req.file);
            console.log(req.body);

            const s3Client = new S3Client({
                region: "ap-south-1",
                credentials: {
                     accessKeyId: process.env.ACCESSKEY,
					
					
					
                     secretAccessKey: process.env.SECRETACCESS
                }
            });

            const filename = `chat_${req.file.originalname}`;
            console.log("putting object");

            const imageFilePath = req.file.path;

            const command = new PutObjectCommand({
                Bucket: "newtesting12",
                Key: filename,
                Body: fs.createReadStream(imageFilePath),
                ContentType: "image/jpeg"
            });

            await s3Client.send(command);
            console.log("file is successfully uploaded");
            console.log("starting getobject");

            const command2 = new GetObjectCommand({
                Bucket: "newtesting12",
                Key: filename
            });

            fileurl = await getSignedUrl(s3Client, command2);
        }

        console.log(fileurl);

        console.log("start creating message model");
        const message = await Message.create({
            senderId: req.user.id,
            content: fileurl ? fileurl : content,
            chatId: chatId,
			types:req.file?"files":"text"
        });

        // fetch new messages with associated chat and sender
        const newMessages = await Message.findByPk(message.id, {
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'username']
                },
                {
                    model: Chat,
                    as: 'chat',
                    include: [
                        {
                            model: User,
                            as: 'users',
                            attributes: ['username', 'email']
                        }
                    ]
                }
            ]
        });

        await Chat.update({ latestMessageId: message.id }, {
            where: { id: chatId }
        });

        res.json(newMessages);
    } catch (err) {
		console.log(err);
        res.status(400).json({ message: err.message });
    }
};
