import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../../context/ChatProvider'

const Navbar = () => {

	const {user}=useContext(ChatContext)
	useEffect(()=>{
		console.log(user)
	})
  return (
	<div className='navbar'>

		<span className="logo">x-chat</span>
		
		<div className="user">
			
		</div>
	</div>
  )
}

export default Navbar