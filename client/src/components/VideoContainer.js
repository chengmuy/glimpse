import React from 'react';
import Participant from './Participant';
import { peerConnection } from '../socket';

class VideoContainer extends React.Component {
  constructor(props) {
    console.log('construct VideoContainer');
    super(props);
    this.state = { localStream: null, remoteStream: null };
    this.setRemoteStream = this.setRemoteStream.bind(this);
  }

  setRemoteStream(stream) {
    this.setState({ remoteStream: stream });
  }

  componentDidMount() {
    const setRemoteStream = this.setRemoteStream.bind(this);
    peerConnection.ontrack = function (rtcTrackEvent) {
      console.log(`ontrack invoked`);
      let stream = rtcTrackEvent.streams[0];

      setRemoteStream(stream);
    };

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.setState({ localStream: stream });
          stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
        })
        .catch((err) => console.error(err));
    } else {
      alert('Please reload with https');
    }
  }

  render() {
    // console.log('render VideoContainer');
    return (
      <div className="columns">
        <div className="column">
          <Participant participantId="remote" stream={this.state.remoteStream} />
        </div>
        <div className="column is-4">
          <Participant participantId="local" isSelf stream={this.state.localStream} />
        </div>
      </div>
    );
  }
}

export default VideoContainer;
