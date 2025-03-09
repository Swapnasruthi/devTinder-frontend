import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/sockets";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const send = () => {
    // Send the message to the server using the socket connection
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage(""); // Clear the input after sending the message
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Create a socket connection and join the chat room with the target user id and user id
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });
  
    // Listen for messages from the server and update the messages state 
      socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, {firstName, text}]);
      // setMessages((prevMessages) => [...prevMessages, { firstName, text }]); // Update messages state
    });

    // Closing the socket
    return () => {
      console.log("closing socket");
      socket.disconnect();
    };

  }, [userId, targetUserId]);

  return (
    <div className="flex flex-col border border-r w-7/12 mx-auto mt-5 h-[35rem]">
      <p className="border-b border-gray-600 p-2 text-lg font-bold w-full text-center">Chat</p>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((message, index) => (
          <div key={index} className="chat chat-start">
            <div className="chat-header">
              {message.firstName || "Anonymous"}
              <time className="text-xs opacity-50 m-1">Just now</time>
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-600 flex items-center gap-2">
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className="flex-1 border border-gray-500 text-white p-3 rounded-lg outline-none"
          type="text"
        />
        <button onClick={send} className="btn btn-secondary font-bold">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;