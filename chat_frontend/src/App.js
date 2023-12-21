import logo from './logo.svg';
import './App.css';
import { useContext, useState } from 'react';
import Navbar from './components/Navbar';
import { AuthContext } from './context/authcontext';
import Chat from './components/Chat';
import Login from './components/Login';
// import { io } from 'socket.io-client';
function App() {
 const [inputMessage,setInputMessage]=useState('')
  const handleSubmit=(e)=>{
//     e.preventDefault();
//     const messages=document.getElementById('messages')
// if(inputMessage){

// }

  }
  const{user}=useContext(AuthContext)
  return (
    <div className="Chat-app">
      <Navbar/>
      {user?<Chat/>:<></>}
      {/* <div>
      <div className="chat-container ">
      <div id="messages"></div>
        <form id="form" action="" onSubmit={handleSubmit()}>
          <input id="input" value={inputMessage} onChange={(e)=>{setInputMessage(e.target.value)}} autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
      </div> */}
     
    </div>
  );
}

export default App;
