import React from 'react'
import Img from '../../assets/icon.svg'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const Input = () => {
  const toast=useToast();

const sendMessage=async(e)=>{

  if(e.key=='Enter' && newMessage){
    try{

      const {data}=axios.post("/api/message",{
        content:newMessage,
        chatId:selectedChat.id
      },{Authorization:true})

      console.log(data);

      setNewMessage("");
      setMessages([...Messages,newMessage])


    }catch(err){
      toast({
        title:"error occured",
        description:"failed to send message",
        duration:5000,
        position:top
      })

      console.log(err);
    }
  }

}

  return (
	<div className='inputs'>
    <input type="text"  placeholder='Type something.....'  onClick={sendMessage}/>

      <div className="send">
        <img src="" alt=""  />
        
        <input type="file" style={{display:"none", height:"10px"}} name="" id="file" />
       <label htmlFor="file">
      <img src={Img} alt=""  />
       </label>

        <button>send</button>
      </div>

  </div>
  )
}

export default Input