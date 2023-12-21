import { useContext, useState } from "react";
import { ChatContext } from "../../context/chatcontext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipent";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const Chatbox = ({ user }) => {
  const { currentChat, messageChats, ismessageChatLoading, messageError, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textmessage, setTextmessage] = useState('');

  if (!recipientUser) {
    return (
      <p>No conversation selected yet....</p>
    );
  }

  if (ismessageChatLoading) {
    return (
      <p>Loading messages....</p>
    );
  }

  return (
    <div className="bg-gray-400 text-white p-4 rounded-lg h-5/6 mx-8 ">
      <h3 className="text-lg font-semibold mx-4">Chat Messages</h3>
      <div className="bg-gray-100 text-gray-800 rounded-lg h-5/6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{recipientUser?.name}</h2>
        <div>
          {messageChats &&
            messageChats.map((message, index) => (
              <div
                key={index}
                className={`${
                  message?.senderId === user?._id
                    ? "flex justify-end"
                    : "flex justify-start"
                } items-center mb-2`}
              >
                <div
                  className={`${
                    message?.senderId === user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-400 text-black"
                  } max-w-md p-3 rounded-lg`}
                >
                  <span className="block">{message.text}</span>
                  <span className="text-sm text-gray-600">
                    {moment(message.createdAt).calendar()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-2 h-1/6">
        <form id="forminput" action="" className="flex" onSubmit={(e) => { e.preventDefault(); sendTextMessage(textmessage, user, currentChat._id, setTextmessage) }}>
          <input
            id="inputmessage"
            autoComplete="off" value={textmessage} onChange={(e) => { setTextmessage(e.target.value) }}
            className="flex-1 border p-2 rounded-lg text-black"
            placeholder="Enter a message"
          />
          
          <button className="bg-blue-500 text-white p-2 rounded-full">
          <i class="fa-solid fa-paper-plane fa-beat fa-sm"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
