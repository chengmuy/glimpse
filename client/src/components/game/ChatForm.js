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
      className="field has-addons"
    >
      <p className="control is-expanded">
        <input
          className="input is-family-custom"
          name="text"
          type="text"
          placeholder="guess away!"
          autocomplete="off"
        />
      </p>
      <p className="control">
        <input className="button is-family-custom is-info" type="submit" value="Send" />
      </p>
    </form>
  );
};

export default ChatForm;
