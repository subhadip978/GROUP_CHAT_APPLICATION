import React from 'react'
import { ChatContext } from '../../context/ChatProvider'
import { useContext } from 'react'
import { isSameSender,isLastMessage } from '../../config/ChatLogic'
import './message.scss'
const MessageBar = ({messages}) => {

const {user}=useContext(ChatContext)

  return (
	<div className="message-content" >

		
			{messages.map((m,i)=>(

			<span 
				key={m.id} 
				style={{ display: "flex",
				flexDirection:"column",
				 marginBottom: '5px' ,
				 alignItems: `${m.sender.id === user.id ? 'flex-end' : 'flex-start'}`
			 }}>

				

				{((isSameSender(messages,m,i,user.id)) || isLastMessage(messages,i,user.id) ) && 
					(<span style={{
						fontSize: '0.7em', 
						color: 'gray', 
						marginLeft: '-5px',

						
					}}>
							{m.sender.username}
					</span>)}


			{m.types === 'text' ? (
              m.content
            	) : (
              <img src={m.content} alt="uploaded-file" style={{ maxWidth: '40%' }} />
            )}

          </span>

        ))}

	</div>
  )
}

export default MessageBar