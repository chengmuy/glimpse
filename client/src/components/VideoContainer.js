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
      // console.log(stream);
      let stream = rtcTrackEvent.streams[0];

      // this.setState({ remoteStream: stream });
      setRemoteStream(stream);
      // const remoteVideo = document.getElementById('remote-video');
      // if (remoteVideo) {
      //   console.log('remote video found');
      //   remoteVideo.srcObject = rtcTrackEvent.streams[0];
      // }
    };

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
      <div style={{ display: 'flex' }}>
        <Participant participantId="remote" stream={this.state.remoteStream} />
        <Participant participantId="local" isSelf stream={this.state.localStream} />
      </div>
    );
  }
}

export default VideoContainer;
