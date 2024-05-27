

const sequalize=require("../util/database");


const Chat=sequalize.define('chat',{
	id:{},
	chatName:{
		Type:Sequalize.STRING,
		allowNull:true,
	},

	isGroupChat:{
		type:Sequalize.BOOLEAN,
		defaultValue:false,
	},

	userIds:{
		type:Sequalize.INTEGER,
		allowNull:true,
		references:{
			model:'User',
			key:'id',
		},
	},
	latestMessageId:{
		type:Sequalize.INTEGER,
		references:{
			model:'Message',
			key:'id',
		},
	},


})