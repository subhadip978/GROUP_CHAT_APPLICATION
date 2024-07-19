import React from 'react'
import { useContext } from 'react';

import Messages from '../messages/Messages'
import Input from '../input/Input'
import { ChatContext } from '../../context/ChatProvider';



const ChatBlock = ({fetchAgain,setFetchAgain}) => {
	const {selectedChat,user}=useContext(ChatContext);


  return (
	<div className='chatblock'>
		<div className="chatinfo">
		{user && 
			<span >{user.name}</span>}
		</div>
		<Messages  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
	{/* <Input/> */}

	
	</div>
  )
}

export default ChatBlock