import { BrowserRouter,Routes,Route } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import SignIn from "./SignIn";
import { ChatContextProvider } from "../context/chatcontext";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import Chat from "./Chat";

function Routersetting() {
  const {user}=useContext(AuthContext)
    return ( 
        <ChatContextProvider user={user}>
        <BrowserRouter>
        <Routes>
          <Route index element={<App/>}></Route>
          <Route path="/login" element={<Login/>} />
            <Route path="register" element={<SignIn/>} />
            <Route path="/chat" element={<Chat/>} />
        </Routes>
        </BrowserRouter>
        </ChatContextProvider>
     );
}

export default Routersetting;