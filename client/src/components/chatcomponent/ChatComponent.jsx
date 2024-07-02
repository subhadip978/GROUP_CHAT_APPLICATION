import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { useToast } from '@chakra-ui/react'

import image from '../../assets/profile.jpg'
import { getSender } from '../../config/ChatLogic'
import { ChatContext } from '../../context/ChatProvider'
import axios from 'axios'

const ChatComponent = ({fetchAgain}) => {
	const toast=useToast();
	const [loggedUser,setLoggedUser]=useState();
	const {chats,setChats,setSelectedChat}=useContext(ChatContext);


 const fetchChat=async()=>{
	 	const config={
	 		headers:{
	 			Authorization :true,
	 		},
	 	};
				
	 	try{
	 		const {data}=await axios.get("/api/chat",config);
	 		console.log(data);
	 		setChats(data);

	 	}catch(err){
	 		toast({
	 			title:"error occured",
	 			description:"failed to load the chat",
	 			status:'error',
				position:'bottom-left'
	 		})

	 		console.log(err);
	 	}
	 }



	 useEffect(()=>{
	 	setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
	 	fetchChat();

	 },[fetchAgain])






  return (
	<div className='chatComp'>
			
		

	
		
			{chats ? (
				chats.map((chat)=>(

				<div className="userChat" onClick={()=>setSelectedChat(chat)} key={chat.id}>
					
			<div className="userinfo">
				<span>

					{!chat.isGroupChat? getSender(loggedUser,chat.users):chat.chatName} 
					</span> 
			
		
			
				<p>Hello janu</p>
			</div>

			</div>
				))
			


			):(
			<p>no chat available</p>
			)

		}

	</div>
  );
};

export default ChatComponent

		