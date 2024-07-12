const express=require('express');

const app=express();

const sequelize=require('./util/database')
require("dotenv").config();

const port=process.env.PORT || 3000;
const cookieParser=require('cookie-parser');
const cors=require('cors');

// const server=require('http').createServer(app);

 app.use(
 	cors({
 		origin:"http://localhost:5173",
 		credentials:true
 	})
 )
 app.use(cookieParser());

const authRouter=require("./routers/auth.router");
const userRouter=require("./routers/user.router")
const chatRouter=require('./routers/chat.router');
const messageRouter=require("./routers/message.router")

app.use(express.json());



app.use("/api",authRouter);
app.use("/api",userRouter);
app.use("/api",chatRouter);
app.use("/api",messageRouter);


// const io= require('socket.io')(server,{
// 	pingTimeout:60000,
// 	cors:{
// 		origin:"http://localhost:3000"
// 	},
// });

// io.on("connection",(socket)=>{

// 	console.log("connected to socket.io");
// 	socket.on('setup',(userData)=>{
// 		socket.join(userData.id);
// 		socket.emit('connected');
// 	})

// 	socket.on('join chat',(room)=>{

// 		socket.join(room);
// 		console.log("user joined room : " + room )
// 	})


// })

sequelize
 .sync()
.then(result=>{
	app.listen(3000)
})
.catch(err=>{
	 console.log(err);
})


