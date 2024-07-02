import React from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Box,
	useToast,
	FormControl,
	Input
	
	
  } from '@chakra-ui/react'
  import { useContext,useState } from 'react'
import { ChatContext } from '../../context/ChatProvider'
import UserBadgeItem from '../uerList/UserBadgeItem'

import axios from 'axios'

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain}) => {
  

	const { isOpen, onOpen, onClose } = useDisclosure();

	const[ groupChatName,setGroupChatName]=useState([]);

	const [searchResult,setSearchResult]=useState([]);

	const toast=useToast();

	const {selectedChat,setSelectedChat}=useContext(ChatContext)



	const handleRemove=async(u)=>{

	}

	const handleRename=async()=>{

		if(!groupChatName){
			return
		}

		try{

			const {data}=await axios.put('/api/chat/rename',{chatId:selectedChat.id,
				chatName:groupChatName,
			
			},{Authorization:true}
			)
				console.log(data);
			setSelectedChat(data);
			setFetchAgain(!fetchAgain)
			setGroupChatName("");

		}catch(err){
			toast({
				title:"error occured",
				description:"err.reponse.data.message",
				duration:5000,
				position:bottom
			})
			console.log(err);
		}

	}

	const handleSearch=()=>{

	}

	return (
		<>
		  <Button onClick={onOpen}>Open Modal</Button>
	
		  <Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
			  <ModalHeader>{selectedChat.chatName}</ModalHeader>
			  <ModalCloseButton />
			  <ModalBody>

				<Box>

					{
						selectedChat.users.map((u)=>
						<UserBadgeItem
								 key={u.id}
								 user={u} 
								handleFunction={()=>handleRemove(u)}
									/>)
					}
				</Box>

				<FormControl>

					<Input 
					placeholder=''
					onChange={(e)=>setGroupChatName(e.target.value)}  
					
					/>

				</FormControl>

				

				<Button onClick={handleRename}>
					Update
					
				</Button>


				<FormControl>
					<Input  
					placeholder='Add user to the group'

					
					onChange={((e)=>handleSearch(e.target.value))}
					
					
					/>
				</FormControl>
				
			  </ModalBody>
	
			  <ModalFooter>
				<Button colorScheme='blue' mr={3} onClick={onClose}>
				  Close
				</Button>
				<Button variant='ghost'>Secondary Action</Button>
			  </ModalFooter>
			</ModalContent>
		  </Modal>
		</>
	  )

	
  
}

export default UpdateGroupChatModel