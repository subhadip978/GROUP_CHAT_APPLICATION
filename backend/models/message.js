const sequelize=require("../util/database");
const Sequelize=require('sequelize');
const User=require("./user");
const Chat=require("./chat");

const Message=sequelize.define('messages',{
	id:{
		type:Sequelize.INTEGER,
		allowNull:false,
		autoIncrement:true,
		primaryKey:true,
	},


content:{
	type:Sequelize.STRING,
	allowNull:true

},
types:{
	type:Sequelize.STRING,
	allowNull:true
}

	});


User.hasMany(Message,{foreignKey:'senderId',as:'messages'});
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

//   Chat.hasMany(Message, {  	foreignKey: 'chatId',  	as: 'message'      });
  
    // Message.belongsTo(Chat, {
  	// foreignKey: 'chatId',
  	// as: 'chat'  
    // });


module.exports=Message ;


