import { useState ,createContext ,useEffect, useCallback} from "react";
import { baseURL,getRequest,postRequest } from "../utils/service";
import { io } from 'socket.io-client';

export const ChatContext=createContext();

export const ChatContextProvider=({children,user})=>{
  const [userChats ,setUserChats]=useState(null)
  const [isUserChatLoading ,setIsUserChatLoading]=useState(null)
  const [userChatsError ,setUserChatsError]=useState(null)
  const [potentialChats ,setPotentialChats]=useState(null)
  const [currentChat ,setCurrentChat]=useState(null)
  const [messageChats ,setMessageChats]=useState(null)
  const [ismessageChatLoading ,setIsMessageChatLoading]=useState(null)
  const [messageError ,setMessageError]=useState(null)
  const [sendTextMessageError,setSendTextMessageError]=useState(null)
  const [newMessage,setNewMessage]=useState(null)
  const [socket,setSocket]=useState(null)
 const [onlineUsers,setOnlineUsers]=useState(null)
 
  //initialize socket.io
  useEffect(()=>{
  const newSocket=io("http://localhost:4000")
  setSocket(newSocket)
  return ()=>{
    newSocket.disconnect()
  }
  },[user])

  //online user
  useEffect(()=>{
    if(socket===null) return
     socket.emit('addNewUser',user?._id)
     socket.on('getOnlineUser',(res)=>{
        setOnlineUsers(res)
     })
     return ()=>{
        socket.off("getOnlineUser")
      }
  },[socket])
// send real-time messages
useEffect(()=>{
    if(socket===null) return
    const recipientId = currentChat?.members.find((id) => id !== user?._id);

     socket.emit('sendMessage',{...newMessage,recipientId})
    
  },[newMessage])

  //get message
  useEffect(()=>{
    if(socket===null) return
   socket.on('getMessage',(res)=>{
    console.log(res)
    if(currentChat?._id!==res.chatId) return
    setMessageChats((prev)=>[...prev,res])
   })
   return ()=>{
    socket.off("getMessage")
  }
    
  },[socket,currentChat])
  useEffect(()=>{
    const getUsers=async()=>{
        try{

            const response=await getRequest(`${baseURL}/auth/getalluser`)
            
            if(response.error){
                return console.log("error  fetching users",response)
            }
            const pChats=response.filter((u)=>{
                let ischatcreated=false;
                if(user?._id===u._id) return false;
                if(userChats){
                    ischatcreated=userChats?.some((chat)=>{
                        return chat.members[0]===u._id||chat.members[1]===u._id;
                    })
                 
                }
                return !ischatcreated
            })
           
            setPotentialChats(pChats)
           
        }catch(error){
            console.log("error fetching alluser")
        }
        console.log(potentialChats)
    }
    getUsers()
  },[userChats])
  
   useEffect(()=>{
    const getUserChats=async()=>{
        try{
            if(user?._id){
                console.log(user._id)
                setIsUserChatLoading(true)
                setUserChatsError(null)
                const response=await getRequest(`${baseURL}/chat/${user?._id}`)
                setIsUserChatLoading(false)
    
            console.log(response)
            
                setUserChats(response)
            }
        }catch(error){
            setUserChatsError(error)
        }
       
    }
    getUserChats()
   },[user])
   useEffect(()=>{
    const getMessages=async()=>{
        try{
          
                setIsMessageChatLoading(true)
                setMessageError(null)
                const response=await getRequest(`${baseURL}/message/${currentChat?._id}`)
                setIsMessageChatLoading(false)
    
            console.log(response)
            
                setMessageChats(response)
            
        }catch(error){
            setMessageError(error)
        }
       
    }
    getMessages()
   },[currentChat])


    const createChat=useCallback(async(firstUserId,secondUserId)=>{
      const response=  await postRequest(`${baseURL}/chat/createchat`,
      JSON.stringify({firstUserId,secondUserId})
      )
        if(response.error){
            return console.log("error  fetching chat",response)   
        }
        setUserChats((prev)=>[...prev,response])
    },[])
const updateCurrentChat=useCallback((chat)=>{
    setCurrentChat(chat)
},[])
const sendTextMessage=useCallback(async(textmessage,senderId,currentChatId,setTextmessage)=>{
    if(!textmessage) return console.log("you must type something...")

    const response=  await postRequest(`${baseURL}/message/createmessage`,
    JSON.stringify({
        chatId:currentChatId,
        senderId:senderId,
        text:textmessage
    })
    )
      if(response.error){
          return setSendTextMessageError(response)
      }
      setNewMessage(response)
      setMessageChats((prev)=>[...prev,response])
      setTextmessage(' ')
},[])
    return <ChatContext.Provider value={{
        userChats,
        isUserChatLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messageChats,
        ismessageChatLoading,
        messageError,
        sendTextMessage,
        onlineUsers
    }}>
        {children}
        </ChatContext.Provider>
}