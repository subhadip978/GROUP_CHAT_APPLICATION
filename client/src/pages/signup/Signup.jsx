import React from 'react'
import axios from 'axios'
import {useState} from 'react'

const Signup = () => {
	const [inputs,setInputs]=useState({username:"",
										email:"",
										password:""});


	const handleSubmit=async(e)=>{
		e.preventDefault();
		const data=await axios.post("http://localhost:3000/api/signup", inputs)


	}
	const handleChange=(e)=>{

		e.preventDefault();
		setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))

	}
  return (
	<div>
		<h1>PLEASE SIGNUP </h1>

	<form action="">


		<input type="text" name="username" id="" onChange={handleChange}/>
		<input type="text" name="email" id=""    onChange={handleChange}/>
		<input type="text" name="password" id="" onChange={handleChange}/>
		<button onClick={handleSubmit}>submit</button>
	</form>

	</div>
  )
}

export default Signup