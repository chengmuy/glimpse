import React from 'react';

const WinnerDisplay = ({ word, userId, ownId }) => {
  return (
    <div>
      <h1>{`${userId === ownId ? 'You' : userId.slice(0, 5)} correctly guessed the word "${word}"!`}</h1>
    </div>
  );
};

export default WinnerDisplay;
