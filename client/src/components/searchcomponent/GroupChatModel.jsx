import React from 'react'
import { useState,useContext } from 'react';
import { AddIcon } from '@chakra-ui/icons'
import { 
	Button, 
	useDisclosure, 
	Modal, 
	ModalOverlay, 
	ModalContent, 
	ModalHeader, 
	ModalCloseButton, 
	ModalBody, 
	ModalFooter ,
	FormControl,
	useToast,
	Input,
	Box
  } from "@chakra-ui/react";
import axios from 'axios'

import UserListItem from "../uerList/UserListItem"
import UserBadgeItem from '../uerList/UserBadgeItem';
import { ChatContext } from '../../context/ChatProvider';



const GroupChatModel = ({children}) => {


const[search,setSearch]=useState("");
const [searchResult,setSearchResult]=useState([]);
const [selectedUsers, setSelectedUsers]
=useState([]);

const[groupChatName,setGroupChatName]=useState();

const toast=useToast();

const {user,chats,setChats}=useContext(ChatContext);




	const handleSearch=async(query)=>{
		setSearch(query)
		if(!query){
			return ;
		}
		try{
					
				const {data}=await axios.get(`/api/user?search=${search}`,{
					Authorization:true});
				console.log(data);
				setSearchResult(data);

		}
		catch(error){
			console.log(error);
			toast({title:"error occured",
					description:"failed to load the search results",
					status:"error",
					duration:5000,
					position:"bottom-left",
		})
		}
		}




	const handleSubmit=async()=>{
		if(!groupChatName || !selectedUsers){
			toast({
				title:"please fill all the table",
				status:"warning",
				duration:5000,
				position:"top"
			})
			
			return ;
		}
		try{
				console.log(groupChatName)
			const {data}=await axios.post("/api/chat/group",
			{
				name:groupChatName,
				users:(selectedUsers.map((u)=>u.id))
		},
		{
			Authorization:true
		});
		console.log(data);
		console.log(chats);
		setChats([data,...chats]);
		onClose()
		toast({
			title:"new group chat created",
			status:"success",
			duration:5000,
			position:"bottom"


		})


		}catch(err){
			console.log(err);
			}

	}



	const handleDelete=(deluser)=>{
		console.log(deluser);
		setSelectedUsers(selectedUsers.filter(selectuser=>selectuser.id!=deluser.id))

	}



const handleGroup=(userToadd)=>{
	if(selectedUsers.includes(userToadd)){
		toast({title:"user is already exists in the group",
				status:"warning",
				duration:5000,
				position:top})

				return ;
			}
			console.log(userToadd);

	setSelectedUsers([...selectedUsers,userToadd])

}

	const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
	<Box >
			 <button onClick={onOpen}><AddIcon boxSize={6} /></button>

				<Modal isOpen={isOpen} onClose={onClose} >
				  <ModalOverlay />

				  <ModalContent  >
					  <ModalHeader
             fontSize="30px"          
             
			  display="flex"
			  justifyContent="center"
			   alignItems="center"
         		 >
            Create Group Chat
          </ModalHeader>
			



					<ModalBody  display="flex" flexDirection="column"  alignItems="center">

		
							<FormControl  >
								<Input type="text" 
								placeholder='chat name'  onChange={(e)=>setGroupChatName(e.target.value)}/>
							</FormControl>


							<FormControl>
								<Input type="text"
								placeholder='add user eg:RITU'
								onChange={(e)=>handleSearch(e.target.value)} />
							</FormControl>

							{selectedUsers.map((u)=>(
								<UserBadgeItem
								 key={u.id}
								 user={u} 
								handleFunction={()=>handleDelete(u)}
									/>



							))}


							<FormControl>
								{searchResult?.slice(0,4).map((user) => <UserListItem 
								key={user.id} 
								user={user}
								handleFunction={()=>handleGroup(user)}
								
								/>)}
							</FormControl>

					</ModalBody>

					<ModalFooter>
					  <Button colorScheme='blue'   onClick={onClose}>
						Close
					  </Button>
					  <Button variant='ghost'  onClick={handleSubmit}>create chat</Button>
					</ModalFooter>
				  </ModalContent>
				</Modal>

	</Box>
  )
}

export default GroupChatModel