import React, { useContext } from 'react'
import {Routes,Route,BrowserRouter, Navigate} from 'react-router-dom' 

import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
// import Home from './pages/home/Home'
import ChatPage from './pages/chatpage/ChatPage'
 import ChatProvider, { ChatContext } from './context/ChatProvider'
const App = () => {

    const user=useContext(ChatContext);
    if(user){
      <Navigate to="/" />
    }
  return (
    <div>
      <BrowserRouter>
     <ChatProvider>


      <Routes>
        
        <Route path="/" element={<Signup/>}> </Route>
         <Route path="/signin" element={<Signin/>}> </Route>
        <Route path="/chat" element={<ChatPage/>}> </Route>  
       

      </Routes>
      </ChatProvider>
      


      </BrowserRouter>






    </div>
  )
}

export default App
