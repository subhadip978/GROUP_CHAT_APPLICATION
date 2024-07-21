import React from 'react'
// import Message from './Message'
import { useContext ,useState,useEffect} from 'react'
import { useToast } from '@chakra-ui/react';
import { ChatContext } from '../../context/ChatProvider'
import { getSender } from '../../config/ChatLogic';
import Img from '../../assets/icon.svg'
import Img1 from '../../assets/send.png'
import UpdateGroupChatModel from '../searchcomponent/UpdateGroupChatModel'
import axios from 'axios';
// import io from 'socket.io-client'
import MessageBar from './MessageBar';
import './message.scss'
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
			console.log(selectedChat.id);

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
		   setMessages([]);
		   const intervalId = setInterval(() => {
		 	fetchMessages();
		   }, 3000);

		   return () => clearInterval(intervalId);
 	 

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
	// style={{
		
	//   height: 'calc(100vh - 120px)',   
	//   overflowY: 'auto',   
    // backgroundColor: '#f0f0f0',
	// }}
	
	>


		 <div className="senderInfo" style={{ borderBottom:'2px solid teal', height:"50px", backgroundColor:"wheat",}} >

			{selectedChat ?

			 (!selectedChat.isGroupChat ? (
				<>
				{getSender(user,selectedChat.users)}
				

				</>
			):(
				<div style={{display:"flex" ,flexDirection:"row", justifyContent:"space-around", alignItems:"center",gap:"80px"}} >
				
				<span style={{"marginLeft":"30px"}}>

					{selectedChat.chatName.toUpperCase()}
					</span>
				<UpdateGroupChatModel
				fetchAgain={fetchAgain}
				setFetchAgain={setFetchAgain}
				/>

				</div>


			))
			
			
			:(

				<div style={{ height:"40px"}}>..............lets start the chat </div>

			)
		
		
		}
		</div>

		{
			selectedChat ?(

			 <div >

				<MessageBar  messages={messages}/>
			 </div>):(
				<div className='message-content'>

				</div>
			 )
		}

		 


		
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

	   <img src={Img1} alt="" style={{height:"70px", width:"80px", minHeight: "60px" }} onClick={sendMessage}/>

        {/* <button onClick={sendMessage}>{Img1}</button> */}
      </div>

  </div>




	</div>
  )
}

export default Messages