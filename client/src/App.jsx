import React from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom' 

import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>

        <Route path="/" element={<Home/>}>      </Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        {/* <Route path="/signin" element={signin}> </Route>
        <Route path="/chat" element={Chat}> </Route> */}

      </Routes>


      </BrowserRouter>






    </div>
  )
}

export default App
