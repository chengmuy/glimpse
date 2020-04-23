import React from 'react';
import ChatEntry from './ChatEntry';
import ChatForm from './ChatForm';

const Chat = ({ chatList }) => {
  return (
    <div id="chat">
      <div id="chatArea">
        {chatList.map((entry) => (
          <ChatEntry />
        ))}
      </div>
    </div>
  );
};

export default Chat;
