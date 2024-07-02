import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Signin from '../signin/Signin'
import Signup from '../signup/Signup'


const Home = () => {
  const navigate=useNavigate();

  useEffect(()=>{
   const user=JSON.parse (localStorage.getItem("userInfo"));
   if (user){
    navigate("/chat") ;
   }
  },[navigate])


  return (
	<div>

    

    <Signup/>

  </div>
  )
}

export default Home