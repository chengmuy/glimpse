import React from 'react';
import ChatEntry from './ChatEntry';
import ChatForm from './ChatForm';

const Chat = ({ chatList, ownId }) => {
  return (
    <div id="chat" className="card">
      <div className="card-header">
        <p className="card-header-title subtitle is-5">Chat</p>
      </div>
      <div id="chatArea" className="card-content">
        {chatList.map(({ text, userId }) => (
          <ChatEntry key={userId.slice(0, 5) + text} text={text} userId={userId} ownId={ownId} />
        ))}
      </div>
      <div id="chatInput" className="xcard-footer">
        <ChatForm />
      </div>
    </div>
  );
};

export default Chat;
