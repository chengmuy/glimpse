// import socketIOClient from 'socket.io-client';
// const socket = socketIOClient('localhost:4200');

const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

const socket = window.io.connect('localhost:4200');

const makeCall = async (socketId) => {
  console.log(`calling ${socketId}`);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socket.emit('callUser', {
    offer,
    to: socketId,
  });
};

socket.on('callUser', async ({ offer, from }) => {
  console.log(`answering ${from}`);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit('answerUser', { answer, to: from });
});

export { socket as default, makeCall };
