import React from 'react'
// import Message from './Message'
import { useContext ,useState,useEffect} from 'react'
import { useToast } from '@chakra-ui/react';
import { ChatContext } from '../../context/ChatProvider'
import { getSender } from '../../config/ChatLogic';
import Img from '../../assets/icon.svg'
import UpdateGroupChatModel from '../searchcomponent/UpdateGroupChatModel'
import axios from 'axios';
import io from 'socket.io-client'
import MessageBar from './MessageBar';

// const ENDPOINT="http://localhost:3000"
// var socket,selectedChatCompare;


const Messages = ({fetchAgain,setFetchAgain}) => {

		const toast=useToast();

	// const [messages,setMessages]=useState([]);

	const [messages,setMessages]=useState([]);
	const [newMessage,setNewMessage]=useState("");

const {user,selectedChat,setSelectedChat}=useContext(ChatContext);
const [socketConnected,setSocketConnected]=useState(false);


const fetchMessages=async()=>{
		if(!selectedChat) return;


		try{

			const {data}=await axios.get(`/api/message/${selectedChat.id}`, {authorization:true});
			console.log(data);
			console.log(messages);

			setMessages(data);


		}catch(err){
			toast({
				title:"error occured",
				description:"failed to laod the message",
				duration:5000,
				position:"bottom",
			})
			console.log(err);
		}
}




const sendMessage=async()=>{
	

	if( newMessage){
	  try{
  
		  setNewMessage("");
		const {data}=await axios.post("/api/message",{
		  content:newMessage,
		  chatId:selectedChat.id
		},{Authorization:true})
  
		console.log(data);
		console.log(messages);
		
		setMessages([...messages,data]);
		console.log(messages)
  
  
	  }catch(err){
		toast({
		  title:"error occured",
		  description:"failed to send message",
		  status:"error",
		  duration:5000,
		  position:"bottom",
		})
  
		console.log(err);
	  }
	}
  
  }



  const handleChange=(e)=>{
	setNewMessage(e.target.value);

  }
useEffect(()=>{
// 	return ()=>{
// 			socket=io(ENDPOINT);
// 			socket.emit("setup",user);
// 			socket.on("connection",()=>setSocketConnected)
 	 	// }
	

fetchMessages();

 },[selectedChat])

  return (
	<div className='messages'
	style={{
		height: 'calc(100vh - 120px)', // Adjust height as needed
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f0f0f0',
	}}
	
	>


		 <div >

			{selectedChat ?

			 (!selectedChat.isGroupChat ? (
				<>
				{getSender(user,selectedChat.users)}
				

				</>
			):(
				<div>
				
				<span>

					{selectedChat.chatName.toUpperCase()}
					</span>
				<UpdateGroupChatModel
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}
				/>

				</div>


			))
			
			
			:(

				<div>lets start the chat </div>

			)
		
		
		}

		{
			selectedChat &&

			 <div>

				<MessageBar  messages={messages}/>
			 </div>
		}

		 </div>




		 <div className='inputs'>
    <input type="text" 
	 placeholder='Type something.....' 
	 value={newMessage}
	 onChange={handleChange}
	  />

      <div className="send">
        <img src="" alt=""  />
        
        <input type="file" style={{display:"none", height:"10px"}} name="" id="file" />
       <label htmlFor="file">
      <img src={Img} alt=""  />
       </label>

        <button onClick={sendMessage}>send</button>
      </div>

  </div>



	</div>
  )
}

export default Messages