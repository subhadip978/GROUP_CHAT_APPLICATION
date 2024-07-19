import React from 'react'
import { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import '../signup/signup.scss'

const Signin = () => {

	const navigate=useNavigate();
	const [inputs,setInputs]=useState({
		email:'',
		password:''
	});

	const handleChange=(e)=>{
		e.preventDefault();

		setInputs((prev)=>({...prev,[e.target.name]:e.target.value}) )
	}

	const handleSubmit=async(e)=>{
		e.preventDefault();
		try{

			const {data}= await axios.post("/api/signin", inputs)
			console.log(data)
			 localStorage.setItem("userInfo",JSON.stringify(data))
			 navigate("/chat");
		}
		catch(err){
			console.log(err.message)
		}
	}
  return (
	<div className="formContainer">
		<div className="formWrapper">
			<span>X-Chat</span>
			<span>Sign in</span>
		<form >

			<input type="email" name="email" id="email" 		autoComplete="email" onChange={handleChange}/>
			<input type="password" name="password" id="password"  autoComplete="current-password"	onChange={handleChange}/>
		<button onClick={handleSubmit}>signin</button>
		</form>
		<p>YOU DONT HAVE ACCOUNT ?<Link to="/"> signup</Link></p>
	</div>
	</div>
  )
}

export default Signin