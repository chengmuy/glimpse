import React from 'react';
import Participant from './Participant';

const VideoContainer = () => {
  return (
    <div>
      <Participant participantId="remote" />
      <Participant participantId="local" isMuted={true} isSelf />
    </div>
  );
};

export default VideoContainer;
