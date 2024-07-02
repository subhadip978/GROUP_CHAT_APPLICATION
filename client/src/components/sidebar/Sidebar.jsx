import React from 'react'
import { useState } from 'react';
const Sidebar = () => {
	const [search,setSerach]=useState();
	const [searchResult,setSearchResult]=useState();


  return (
	<div>

		<div className="searchButton">

		<i className="fas fa-search"></i>
		<span className='searchText'>
			Search user to chat
		</span>
		</div>

	<span className="headerText">LET'S CHAT</span>


	






	</div>
  )
}

export default Sidebar