const express=require('express');

const app=express();

const sequelize=require('./util/database')
require('dotenv').config();

const port=process.env.PORT || 3000;

const authRouter=require("./routers/auth.router");

app.use(express.json());
app.use("/",authRouter);


sequelize
.sync()
.then(result=>{
	app.listen(3000)
})
.catch(err=>{
	console.log(err);
})