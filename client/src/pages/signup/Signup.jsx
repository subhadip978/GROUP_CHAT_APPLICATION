import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.scss'
import { Link } from 'react-router-dom'

const Signup = () => {
	const navigate=useNavigate();
	const [inputs,setInputs]=useState({username:"",
										email:"",
										password:""});


	const handleSubmit=async(e)=>{
		e.preventDefault();
		try{

			const response=await axios.post("http://localhost:3000/api/signup", inputs);
			navigate("/signin");
			console.log(response);
		}
		catch(err){
			console.log(err.message);
		}


	}
	const handleChange=(e)=>{

		e.preventDefault();
		setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))

	}
  return (
	<div className="formContainer">
		<div className="formWrapper">
			<span>X-Chat</span>
			<span>Sign up</span>


	<form >


		<input type="text" name="username" id="" onChange={handleChange}/>
		<input type="email" name="email" id=""    onChange={handleChange}/>
		<input type="password" name="password" id="" onChange={handleChange}/>
		<button onClick={handleSubmit}>submit</button>
	</form>
	<p>You dont have account ? Signin <Link to="/signin">Signin</Link></p>
		</div>
		


	</div>
  )
}

export default Signup