import react from 'react';
//  import { ChatState } from '../../context/ChatProvider';
 import { useContext } from 'react';
import {ChatContext }from '../../context/ChatProvider'
import ChatProvider from '../../context/ChatProvider';
import Sidebar from '../../components/sidebar/Sidebar';
import Mychat from '../../components/mychat/Mychat';
// import Chatbox from '../../components/chatbox/Chatbox';
import ChatBlock from '../../components/chatbox/ChatBlock';
import './chatpage.scss' ;

import { useState } from 'react';



const ChatPage=()=>{

		// const {user}=ChatState();
		const {user}=useContext(ChatContext);
		const [fetchAgain,setFetchAgain]=useState(false);

	return(
		<div className='chat'>
			<div className="container">
				<Mychat   fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} />
				<ChatBlock   fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain}/>


			</div>
			


		</div>
	)
};

export default ChatPage 