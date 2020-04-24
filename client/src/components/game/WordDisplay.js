import React from 'react';

const WordDisplay = ({ word }) => {
  return (
    <>
      <h3 className="subtitle is-5">
        Your word is: <span className="has-text-weight-bold has-text-info subtitle is-3">{word}</span>
      </h3>
    </>
  );
};

export default WordDisplay;
