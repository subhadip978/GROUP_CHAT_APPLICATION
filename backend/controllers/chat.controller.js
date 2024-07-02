const Chat=require("../models/chat");
const User=require("../models/user");

const Sequelize=require('sequelize');
const sequelize=require("../util/database");


const { Op,fn,col ,literal} = require('sequelize');





exports.accessChat = async (req, res) => {
	const { userId } = req.body;
	const currentUserId = req.user.id;
try{
	const user1 = await User.findByPk(userId);
	const user2 = await User.findByPk(currentUserId);
	console.log(user1)

const isChat = await Chat.findAll({
	where:{
		isGroupChat:false,
	},
    attributes: [
        'id', 
        'chatName', 
        [fn('COUNT', col('users.id')), 'userCount']
    ],
    include: [{
        model: User,
        as: 'users',
        attributes: [], 
        through: {
            attributes: [] 
        },
        where: {
			
            id: {
                [Op.in]: [user1.id, user2.id]
            }
        }
    }],
    group: ['id'],
    having: literal('COUNT(users.id) = 2')
});

	if(isChat.length>0){
		
		res.status(200).json(isChat);

	}
	else{
		const createChat=await Chat.create({
			chatName:"sender",
			isGroupChat:false,	
		   });
			await createChat.addUsers([userId,currentUserId]);
			const fullChat=await Chat.findOne({
				where:{
					id:createChat.id
				},
					include:{
						model:User,
						as :'users',
						attributes:{exclude:['password']},
		  
				   },
				  
				});
				
		  
			  res.status(200).send(fullChat)

	}


}

	
//  }

	 catch (error) {
		console.log(error);
	  res.status(400).json({ message: error.message });
	}

}







exports.createChat=async(req,res)=>{
	try{
		const { userId } = req.body;
	// console.log(userId);
	 const currentUserId = req.user.id;
		const createChat=await Chat.create({
			chatName:"sender",
			isGroupChat:false,	
		   });
			await createChat.addUsers([userId,currentUserId]);
			const fullChat=await Chat.findOne({
				where:{
					id:createChat.id
				},
					include:{
						model:User,
						as :'users',
						attributes:{exclude:['password']},
		  
				   },
				  
				});
		  
			  res.status(200).send(fullChat)




	}catch(err){
		console.log(err)
		res.status(500).json(err);

	}
}







//GET api/chat     --. give all the chats


exports.fetchChat=async(req,res)=>{
	console.log(req.user.id);
	try{
		const fetchchats=await Chat.findAll({
			
			through:{
				where:{userId:req.user.id}
			},
			include:[{
				model:User,
				as:'users',
				attributes:{exclude:['password']},
			}
			
			]
		})

res.send(fetchchats);

	}catch(err){
		console.log(err);
		res.status(400).json({message:err.message});

	}
}





//create a group chat


exports.createGroupChat=async(req,res)=>{
	console.log(req.body.name);
	if(!req.body.users || !req.body.name){
		return res.status(400).json("please fill all  fields")
	}
	  

	//  users.push(req.user.id);

	try{

		 const newChat=await Chat.create({

		 	chatName:req.body.name,
		 	isGroupChat:true,
		 	
		 	groupAdminId:req.user.id,
		 })
		 	const userIds = [...req.body.users, req.user.id]; // This combines the provided user IDs with the current user's ID
			await newChat.addUsers(userIds);
		//  await newChat.addUsers(req.body.users,req.user.id);

		 const fullGroupChat=await Chat.findByPk(newChat.id,{
		 	include:[
		 		{
		 		model:User,
		 		as:'users',
		 		attributes:{exclude:['password']},
		 		},
		 		{
		 			model:User,
		 			as:'groupAdmin',
		 			attributes:{exclude:['password']},
		 		},
		 	]
		 });
		res.status(200).json(fullGroupChat);



	}catch(err){
		console.log(err.message);
		res.status(400).json({message:err.message});

	}
}





exports.renameGroup=async(req,res)=>{
	try{
		const {chatId,chatName}=req.body;

		const updatedChat=await Chat.findByPk(chatId);


		updatedChat.chatName=chatName;
		await updatedChat.save();

		if(updatedChat[0]==0){
			res.status(404).json("chat not found");
		}
		const fullUpdatedChat= await Chat.findByPk(updatedChat.id,{
			include:[
				{
					model:User,
					as:'users',
					// through:{attributes:[]},
				},
				{
					model:User,
					as:'groupAdmin',
				}
			]
		})
		res.status(200).json(fullUpdatedChat);


	}
	catch(err){
		console.log(err);
		res.status(500).json({message:'Internal server error'})

	}
}







//add user to group
exports.addToGroup=async(req,res)=>{
	try{
		const {chatId,userId}=req.body;


		const chat=await Chat.findByPk(chatId,{
			include:[
				{
					model:User,
					as:'users'
				},
				{
					model:User,
					as:'groupAdmin'
				}
			]

		});
		await chat.addUser(userId);

		const updatedChat=await Chat.findByPk(chatId,{
			include:[
				{
					model:User,
					as:"users"
				},
				{
					model:User,
					as:"groupAdmin"
				},
			]
		})

		res.json(updatedChat);

	}catch(err)
{
	console.log(err);
	res.status(500).json({message:'internal server error'})

}}


//remove uer from group

//find by id and update the users

exports.removeFromGroup=async(req,res)=>{
	try{

		const {chatId,userId}=req.body;

		const chat=await Chat.findByPk(chatId,{
			include:[
				{
					model:User,					
					as:'users'
				},
				 {
				 	model:User,
				 	as:'groupAdmin'
				 },
			],
		});

		await chat.removeUser(userId);

		const updatedChat=await Chat.findByPk(chatId,{
			include:[
				{
					model:User,
					as:'users'
				},
			 	{model:User,
			 		as:'groupAdmin'
			 	}
			 ]
		});
		res.json(updatedChat);

	}
	
	catch(err){
		res.status(404).json({message:err.message});

	}
}

