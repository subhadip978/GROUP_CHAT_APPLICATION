
const User =require("../models/user")

const {Op}=require('sequelize');


// api/user?search=sd

exports.allUser=async(req,res)=>{

		try{
			const searchQuery = req.query.search || '';
			console.log("Search Query:", searchQuery);

			const users=await User.findAll({
										where:{
											username:{
												[Op.like]:`%${searchQuery}%`,
											},
										},
										});
										console.log("Users Found:", users);
			res.status(200).json(users);
		}
		catch(err){
			res.status(500).json(err);
			console.log(err.message);
		}

	}
	

