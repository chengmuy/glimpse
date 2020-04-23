import React from 'react';
import Participant from './Participant';
import { peerConnection } from '../socket';

class VideoContainer extends React.Component {
  constructor(props) {
    console.log('construct VideoContainer');
    super(props);
    this.state = { localStream: null };
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.setState({ localStream: stream });
        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      })
      .catch((err) => console.error(err));
  }

  render() {
    console.log('render VideoContainer');
    return (
      <div>
        <Participant participantId="remote" />
        <Participant participantId="local" isSelf stream={this.state.localStream} />
      </div>
    );
  }
}

export default VideoContainer;
