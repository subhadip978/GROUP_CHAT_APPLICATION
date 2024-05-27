
const User =require("../models/user")

const {Op}=require('sequalize');

exports.allUser=async(req,res)=>{

	
			const user=await User.findsAll({where:{nmae:{[Op.iLike]:`%{req.query.search}`}}});
			res.status(200).json(user);

	}
	

