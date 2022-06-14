import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Avatar from './pages/Avatar';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Chat/>}/>
      <Route path="/avatar" element={<Avatar/>}/>
      <Route path="/chatContainer" element={<ChatContainer/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App