import React from 'react'
import { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { useToast } from '@chakra-ui/react'


import Searchcomponent from '../searchcomponent/Searchcomponent'
import ChatComponent from '../chatcomponent/ChatComponent'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatProvider'

import axios from 'axios'



const Mychat = ({fetchAgain}) => {

const toast=useToast();

// const [loggedUser,setLoggedUser]=useState();

const {selectedChat,setSelectedChat,user,chats,setChats}=useContext(ChatContext);

	// const fetchChat=async()=>{
	// 	const config={
	// 		headers:{
	// 			Authorization :true,
	// 		},
	// 	};
				
	// 	try{
	// 		const {data}=await axios.get("/api/chat",config);
	// 		console.log(data);
	// 		setChats(data);

	// 	}catch(err){
	// 		toast({
	// 			title:"error occured",
	// 			description:"failed to load the chat",
	// 			status:'error'
	// 		})

	// 		console.log(err);
	// 	}
	// }

	// useEffect(()=>{
	// 	setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
	// 	fetchChat();

	// },[])




  return (
	<div className='mychat'>
	<Navbar/>
	<Searchcomponent/>
	 <ChatComponent fetchAgain={fetchAgain} /> 
	</div>
  )
}

export default Mychat