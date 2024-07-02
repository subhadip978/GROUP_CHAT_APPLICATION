const Sequelize=require('sequelize');

const sequelize=require("../util/database");
const User=require('./user');
const Message=require('./message');

const Chat=sequelize.define('chats',{
	id:{

		type:Sequelize.INTEGER,
		allowNull:false,
		autoIncrement:true,
		primaryKey:true,
	},
	chatName:{
		type:Sequelize.STRING,
		allowNull:true,
	},
	

	isGroupChat:{
		type:Sequelize.BOOLEAN,
		defaultValue:false,
	}
},

	{
		timestamps:true,
	}

)

User.belongsToMany(Chat, { through:'chatusers', as: 'chats', foreignKey: 'userId', onDelete: 'CASCADE' });
Chat.belongsToMany(User,{ through:'chatusers', as:'users', foreignKey: 'chatId', onDelete: 'CASCADE' });


Chat.belongsTo(User,{foreignKey:'groupAdminId',as:'groupAdmin'});
Chat.belongsTo(Message, { foreignKey:'latestMessageId',as: 'latestMessage'});


Message.belongsTo(Chat, {
	foreignKey: 'chatId',
	as: 'chat'  
});
 Chat.hasMany(Message, {
 	 	foreignKey: 'chatId',
 	  	as: 'message'  
 	    });
 
module.exports=Chat;