const sequalize=require("../util/database");


const Message=sequalze.define('message',{
	sender:{
		type:Sequalize.INTEGER,
		references:{
			model:"User",
			key:"id"
		}

	},
	chatId:{
		type:Sequalize.INTEGER,
		references:{
			
		}
	}




})