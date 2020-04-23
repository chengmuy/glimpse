import React from 'react';

// const Participant = ({ participantId, isMuted, isSelf }) => {
//   // TODO: this useEffect is probably not the right way to do this, refactor
//   React.useEffect(() => {
//     console.log(`getting element #${participantId}-video ... `, document.getElementById(`${participantId}-video`));
//     if (isSelf) {
//       // TODO: this API is outdated, replace it
//       navigator.getUserMedia(
//         { video: true, audio: true },
//         (stream) => {
//           const localVideo = document.getElementById(`${participantId}-video`);
//           if (localVideo) {
//             localVideo.srcObject = stream;
//           }
//         },
//         (error) => {
//           console.warn(error.message);
//         }
//       );
//     }
//   }, [participantId, isSelf]);

//   return (
//     <div>
//       Participant
//       <video autoPlay muted={isMuted || isSelf} id={`${participantId}-video`}></video>
//     </div>
//   );
// };

class Participant extends React.Component {
  constructor(props) {
    console.log('construct Participant');
    super(props);

    this.videoRef = React.createRef();
  }

  videoError(err) {
    console.error(err);
    alert(err.name);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.videoRef.current.srcObject = this.props.stream;
  }

  render() {
    console.log('render Participant');
    return (
      <div>
        <video
          ref={this.videoRef}
          autoPlay
          muted={this.props.isMuted || this.props.isSelf}
          id={`${this.props.participantId}-video`}
        ></video>
      </div>
    );
  }
}

export default Participant;
