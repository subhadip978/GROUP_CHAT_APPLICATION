import React from 'react'
// import Message from './Message'
import { useContext ,useState,useEffect} from 'react'
import { useToast } from '@chakra-ui/react';
import { ChatContext } from '../../context/ChatProvider'
import { getSender } from '../../config/ChatLogic';
import Img from '../../assets/icon.svg'
import UpdateGroupChatModel from '../searchcomponent/UpdateGroupChatModel'
import axios from 'axios';
// import io from 'socket.io-client'
import MessageBar from './MessageBar';
import { useRef } from 'react';

// const ENDPOINT="http://localhost:3000"
// var socket,selectedChatCompare;


const Messages = ({fetchAgain,setFetchAgain}) => {

		const toast=useToast();
		const fileref=useRef(null);
		const [file,setFile]=useState(null);

	

	const [messages,setMessages]=useState([]);
	const [newMessage,setNewMessage]=useState("");

const {user,selectedChat,setSelectedChat}=useContext(ChatContext);
const [socketConnected,setSocketConnected]=useState(false);


const fetchMessages=async()=>{
		if(!selectedChat) return;


		try{

			const {data}=await axios.get(`/api/message/${selectedChat.id}`, {withCredentials:true});
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
	

console.log(file);
	  try{
		let inputs
		if (file) {
			console.log("inside file")
			const formData = new FormData();
			formData.append('file', file);
			
			formData.append('chatId', selectedChat.id); 
			inputs = formData;
		  } else {
			console.log("outside file")
			inputs = {
			  content: newMessage,
			  chatId: selectedChat.id,
			};
		  }
  
		  setNewMessage("");
		const {data}=await axios.post("/api/message",inputs,{withCredentials:true,
			'Content-Type': 'multipart/form-data'

		})
  
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
  
  



  const handleChange=(e)=>{
	setNewMessage(e.target.value);

  }
useEffect(()=>{
// 	return ()=>{
// 			socket=io(ENDPOINT);
// 			socket.emit("setup",user);
// 			socket.on("connection",()=>setSocketConnected)
 	 	// }
		//  setInterval(()=>{

 	 	// fetchMessages();
 	 	// console.log(5);
 	//  },5000)
	

fetchMessages();

 },[selectedChat])

 const selectFile=()=>{
	fileref.current.click();
 }
 const fileSelected=(e)=>{
	const selectfile=e.target.files[0];
	console.log(selectfile);
	setFile(selectfile);

 }

  return (
	<div className='messages'
	style={{
		height: 'calc(100vh - 120px)', 
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
        
        <input type="file" onChange={fileSelected} ref={fileref}
		 style={{display:"none"}}
		  name="" id="file" />

       <label htmlFor="file">
      <img src={Img} alt=""  style={{height:"90px", width:"90px", minHeight: "60px" }} onClick={selectFile}/>
       </label>

        <button onClick={sendMessage}>send</button>
      </div>

  </div>



	</div>
  )
}

export default Messages