
const jwt=require('jsonwebtoken');

exports.verifyToken=async(req,res,next)=>{
	try{

		const token=req.cookies.accessToken ;
		if(!token){
			return res.status(403).send("You are not logged in or user does not have  access")
		}

		jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
				if(err) {
				return res.status(401).json("invalid token or authentication ha failed");
		}

				req.user=user;
				next();
		})


	}catch(err){
		console.log(err);
		res.status(500).json(err,"internal server error");
	}
}