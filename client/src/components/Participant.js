import React from 'react';

const Participant = ({ participantId, isMuted }) => {
  React.useEffect(() => {
    console.log(`getting element #${participantId}-video ... `, document.getElementById(`${participantId}-video`));
  }, [participantId]);

  return (
    <div>
      Participant
      <video autoPlay muted={isMuted} id={`${participantId}-video`}></video>
    </div>
  );
};

export default Participant;
