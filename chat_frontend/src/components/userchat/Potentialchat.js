import { useContext } from "react";

import { ChatContext } from "../../context/chatcontext";
import { AuthContext } from "../../context/authcontext";

function PotentialChats() {
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)
  const { user } = useContext(AuthContext)
  console.log(potentialChats)
  return (
    <div className="flex space-x-4 h-auto">
      {potentialChats &&
        potentialChats.map((u, index) => {
          // Split the full name to get the first name
          const firstName = u.name.split(' ')[0];
  
          return (
            <div className="flex-shrink-0" key={index} onClick={() => createChat(user._id, u._id)}>
              <div className="flex flex-col">
                <div className="relative flex flex-row items-center py-2 rounded">
                  {onlineUsers?.some((user)=>user?.userId===u?._id)?
                  <div className="absolute top-0 right-0 pl-4">
                    <i className="fa-solid fa-circle fa-2xs" style={{ color: "#22e238" }}></i>
                  </div>:<div></div>}
                  <img
                    className="rounded-full h-12 w-12 mx-auto mb-2"
                    src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                    alt="profile"
                  />
                </div>
                <div className="text-center">
                  <div className="font-bold">{firstName}</div>
                </div> 
              </div>
            </div>
          );
        })}
    </div>
  );
  


}

export default PotentialChats;