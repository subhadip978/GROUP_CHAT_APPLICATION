import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import ChatProvider from './context/ChatProvider'
//  import { BrowserRouter  } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<ChakraProvider>


    <App />
</ChakraProvider>







    


  </React.StrictMode>,
)
