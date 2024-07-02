const Message=require("../models/message");
const User=require("../models/user");
const Chat=require("../models/chat");


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







exports.sendMessage=async(req,res)=>{

const {content,chatId}=req.body ;
	try{

		
	
	if (!content || !chatId){
		return res.json(400).json("Invalid data passed into request")
	}


	//create new message
	const message=await Message.create({
		senderId:req.user.id,
		content:content,
		chatId:chatId,
	})

	//fetch new messages with associated with chat and sender
	const newMessages= await Message.findByPk(message.id,{
		include:[
			{
				model:User,
				as:'sender',
				attributes:['id','username']
				},
			{
				model:Chat,
				as:'chat',
				include:[
					{
						model:User,
						as:'users',
						attributes:['username','email']
					}

				]
			},
		]
	})
	await Chat.update({latestMessageId:message.id},
		
			{
		where:{id:chatId}
	})
	;

	res.json(newMessages);

	}catch(err){

		res.status(400).json({message:err.message})

	}


}
