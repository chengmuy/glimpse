import React from 'react';

const WinnerDisplay = ({ word, userId, ownId }) => {
  return (
    <div className="has-text-centered message is-success">
      <h3 className="message-body subtitle is-5">
        {`${userId === ownId ? 'You' : userId.slice(0, 5)} correctly guessed the word "${word}"!`}
      </h3>
    </div>
  );
};

export default WinnerDisplay;
