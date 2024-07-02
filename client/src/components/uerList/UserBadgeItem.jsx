import React from 'react'
import { Box,Text,Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'

const UserBadgeItem = ({user,handleFunction}) => {

	useEffect(()=>{

		console.log(user)
	},[]);
  return (
	<Box
	px={1}
	display="flex"
	alignItems="center"
	cursor="pointer"
	bg="purple"
	color="white"
	borderRadius="50"
	 onClick={handleFunction} >

	<Text margin={1}>	{user.username}</Text>	
		<CloseIcon   fontSize={12}/>



		
	</Box>
  )
}

export default UserBadgeItem 
