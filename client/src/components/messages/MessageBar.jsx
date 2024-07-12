import React from 'react'
import { ChatContext } from '../../context/ChatProvider'
import { useContext } from 'react'
import { isSameSender,isLastMessage } from '../../config/ChatLogic'

const MessageBar = ({messages}) => {

const {user}=useContext(ChatContext)

  return (
	<div>

		{
			messages.map((m,i)=>(

			<div key={m.id} 
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

						
					}}>{m.sender.username}</span>)}

				{m.type === 'file' ? (
                        <img
                            src={m.content}
                            alt="Message content"
                            style={{
                                maxWidth: '75%',
                                maxHeight: '200px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        />
                    ) : (
					<span  style={{ 		  
						 maxWidth:'75%',						
						backgroundColor:`${m.sender.id ===user.id ? "#CEF0CC" :  "#B9F5D0"}`,
						
							padding: '10px',
							borderRadius: '5px',
						}}>


					{m.content}

					 </span>

				
					)}




			</div>


			))
		}




	</div>
  )
}

export default MessageBar