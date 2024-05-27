
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.signin=async(req,res)=>{
  try{

   const {email,password}= req.body;
   const user=await User.findOne({where:{email}}) ;


   if(!user){
      return res.status(404).json({message:'User is not found'})
   }

   const passwordmatch=await  bcrypt.compareSync(password,user.password);
   if(!passwordmatch){
    return res.status(401).json({message:'Wrong password'})
   }
   console.log(process.env.SECRET_KEY);
  
   console.log(process.env.PORT);

   const token=jwt.sign({id:user.id},process.env.SECRET_KEY);
   res.status(200).json({message:'user is successfully logged in'})

  }
  catch(err){
    res.status(400).json({error:err.message});

  }
}