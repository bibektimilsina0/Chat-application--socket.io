import { useState ,createContext ,useEffect, useCallback} from "react";

export const AuthContext=createContext();


export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const logoutuser=useCallback(()=>{
        localStorage.removeItem("info")
        setUser(null)
    },[user])
     useEffect(()=>{
       setUser(JSON.parse(localStorage.getItem('info')))
       
    },[])
  
   return <AuthContext.Provider value={{user,logoutuser}}>{children}</AuthContext.Provider>
}