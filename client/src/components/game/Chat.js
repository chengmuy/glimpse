import React from 'react';
import ChatEntry from './ChatEntry';
import ChatForm from './ChatForm';

const Chat = ({ chatList, ownId }) => {
  return (
    <div id="chat">
      <div id="chatArea">
        {chatList.map(({ text, userId }) => (
          <ChatEntry key={userId.slice(0, 5) + text} text={text} userId={userId} ownId={ownId} />
        ))}
      </div>
      <div id="chatInput">
        <ChatForm />
      </div>
    </div>
  );
};

export default Chat;
