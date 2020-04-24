import React from 'react';
import { sendChat } from '../../socket';

const ChatForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target.text.value);
        sendChat(e.target.text.value);
        e.target.text.value = '';
      }}
    >
      <input name="text" type="text" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ChatForm;
