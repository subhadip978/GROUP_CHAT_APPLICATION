

import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useContext,useState ,useEffect,createContext} from 'react';

export const ChatContext=createContext();

const ChatProvider = ({children}) => {
	const navigate=useNavigate();

	const[user,setUser]=useState();
	const [selectedChat,setSelectedChat]=useState();
	const[chats,setChats]=useState([]);

	useEffect(()=>{
		const userinfo=JSON.parse(localStorage.getItem("userInfo"));
		
		setUser(userinfo);

		//  if(!userinfo){
		//  	navigate("/signin");
		//  }
	},[navigate])

  return (
	<ChatContext.Provider value=  {{user,setUser,selectedChat,setSelectedChat,chats,setChats}}>
		{children}
		</ChatContext.Provider>
  )
};
//  export const ChatState=()=>{

//  	return useContext(ChatContext);
//  }

export default ChatProvider