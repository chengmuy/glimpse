import React from 'react';

const ChatEntry = ({ text, userId, ownId }) => {
  return (
    <div>
      <span>{userId === ownId ? 'me' : userId.slice(0, 5)}</span>: <span>{text}</span>
    </div>
  );
};

export default ChatEntry;
