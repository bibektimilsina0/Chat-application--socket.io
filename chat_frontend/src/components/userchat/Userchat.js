import { useContext } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipent";
import { ChatContext } from "../../context/chatcontext";

const UserChats = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user) || {};
 const{onlineUsers}=useContext(ChatContext)

  
 return (
  <div className="bg-gray-100 p-2 rounded-md flex mx-4 h-5/6">
    <div className="flex flex-col items-start mb-2 mr-2 w-3/4">
      <div className="flex flex-row items-center">
        <div className="text-green-500 mr-1">
          <img
            className="rounded-full"
            src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
            alt="profile"
            style={{ height: '40px', weight: '40px' }}
          />
        </div>
        <div className="font-bold text-lg">{recipientUser?.name}</div>
      </div>
      <div className="text-gray-700 text-sm w-3/4 text-center">
        {/* Your text message content */}
        Text message
      </div>
    </div>
    <div className="bg-white rounded-md shadow-md p-2 w-1/4 content-end">
      {onlineUsers?.some((user) => user?.userId === recipientUser?._id) ? (
        <div className=" ">
          <i className="fa-solid fa-circle fa-2xs" style={{ color: "#22e238" }}></i>
        </div>
      ) : (
        <div></div>
      )}
      <div className="text-gray-600 text-xs w-20 text-end">
        {/* Your timestamp */}
        2023/12/17
      </div>
    </div>
  </div>
);

};

export default UserChats
