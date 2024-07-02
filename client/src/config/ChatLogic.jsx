
export const getSender=(loggedUser,users)=>{
	// console.log(users.username)
	return users[0].id ===loggedUser.id? users[1].username:users[0].username

}

export const isSameSender=(messages,m,i,userId)=>{

	return (
		i<messages.length -1 &&
		(messages[i+1].sender.id !== m.sender.id) &&
		(messages[i].sender.id !== userId)

	)

}


export const isLastMessage=(messages,i,userId)=>{

	return (
		i === messages.length -1 && 
		messages[messages.length -1].sender.id !== userId  &&
		messages[messages.length -1].sender.id 


	)
}

export const  isSameSenderSenderMargin=()=>{

	messages[i].sender.id !== userId

}


