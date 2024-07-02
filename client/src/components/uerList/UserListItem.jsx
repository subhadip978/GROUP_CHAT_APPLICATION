import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatProvider'
 import { Box,Text
  } from '@chakra-ui/react'



const UserListItem = ({user,handleFunction}) => {
	
  return (
	<Box 
	onClick={handleFunction}
	cursor="pointer"
	d="flex"
	alignItems="center"  
	bg="#E8E8E8"
	px={3}
	py={2}
	mb={2}
	
	
	
	>



		<Text>{user.username}</Text>
	</Box>


 	
  )
}

export default UserListItem