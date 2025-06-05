import React from "react";
import Chatbot from "../components/Chatbot";

const FullChat = ({ user, updateUser }) => {
  return (
    <div className="mt-8">
      <Chatbot user={user} updateUser={updateUser} />
    </div>
  );
};

export default FullChat;
