import React from 'react';
import Participant from './Participant';

const VideoContainer = () => {
  return (
    <div>
      <Participant participantId="remote" />
      <Participant participantId="local" isMuted={true} />
    </div>
  );
};

export default VideoContainer;
