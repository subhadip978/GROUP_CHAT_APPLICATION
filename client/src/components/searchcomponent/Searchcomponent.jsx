import React from 'react'
import axios from 'axios'
import { Drawer } from '@chakra-ui/react'
import image from '../../assets/profile.jpg'
import {  useToast } from '@chakra-ui/react'


import GroupChatModel from './GroupChatModel'
import { useContext,useState } from 'react'
import { ChatContext } from '../../context/ChatProvider'


const Searchcomponent = () => {
	const[search,setSearch]=useState("");
	const {user,selectedChat,setSelectedChat,chats,setChats}=useContext(ChatContext);
	const[searchResult,setSearchResult]=useState([]);

	const toast=useToast();

	const handleSearch=async()=>{
		if(!search){
			toast({
				title: "Input Required",
				description: "Enter the name first!",
				status: "error",
				duration: 5000,
				isClosable: true,
				position:"top-left",
			  });
			console.log("please input name");
			return;

		}
		try{
			
			const {data}=await axios.get(`/api/user?search=${search}`,{withCredentials:true});
			console.log(data);
			setSearchResult(data);
			// console.log(searchResult[0].id)

		}catch(err){
			toast({
				title: "Error Occured!",
				description: "Failed to Load the Search Results",
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			  });
			console.log(err);
		}

	}


const accessChat=async(userId)=>{

	try{

		
		const {data}=await axios.post("/api/chat",{userId},{withCredentials:true});
		console.log(data);
		if(!chats.find((c)=>c.id===data.id)){
			setChats([data,...chats])
		}
		
		setSelectedChat(data);


	}catch(error){
		console.log(error);
		toast({
			title:"error in accessing the chat",
			description:error.message,
			duration:5000,
			isClosable:true,
			position:"bottom-left",
		})


	}

}

  return (
	<div className='search'>
		<div className="searchForm">
			<input type="text" 
			placeholder="find a user by name"
			 name="" 
			 id="" 
			 value={search}
			  onChange={(e)=>setSearch(e.target.value)}/>
			 <button  onClick={handleSearch}>search</button>


		<GroupChatModel/>
			{/* <button>ADD NEW GROUP</button>
		</GroupChatModel> */}

		</div>

 
		{searchResult.length > 0 ? (
			searchResult.map((user)=>
			<div className="userChat" key={user.id} onClick={()=>accessChat(user.id)}>
          <div className="userinfo">
         
            <span >{user.username}</span>
            <p>Hello</p>
          </div>
        </div>
			)

      ) : (
        <div></div>
      )}



	</div>
  )
}

export default Searchcomponent