import { useContext } from "react";
import { ChatContext } from "../context/chatcontext";
import UserChat from '../components/userchat/Userchat'
import { AuthContext } from '../context/authcontext';
import PotentialChats from "./userchat/Potentialchat";
import Chatbox from "./userchat/Chatbox";
function Chat() {
   const {user}=useContext(AuthContext)
   const {  userChats,
      isUserChatLoading,
      userChatsError,updateCurrentChat}=useContext(ChatContext);
   console.log("userchats",userChats);
  return ( 
     <div>
      <PotentialChats/>
      { userChats?.length<1?null:(
      <div className="flex flex-row">
         <div className="m-auto border" style={{height:"80vh",width:"30%"}}> 
         <h4 className="text-lg font-semibold mb-4">Friends</h4>
         <div>
            {isUserChatLoading&&<p>Loading chats.....</p>}
            {userChats?.map((chat,index)=>{
               return(
                  <div key={index} onClick={()=>updateCurrentChat(chat)}>
                     <UserChat chat={chat} user={user}/>
                  </div>
               )
            })}
         </div>
         
         </div>
         <div className="ml-auto mr-auto" style={{height:"83vh",width:"70%"}}>
           <Chatbox  user={user}/>
            </div>
      </div>)}
     </div> 
   );

}
  

export default Chat;