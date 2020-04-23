// import socketIOClient from 'socket.io-client';
// const socket = socketIOClient('localhost:4200');

const socket = window.io.connect('localhost:4200');

const { RTCPeerConnection, RTCSessionDescription } = window;
const peerConnection = new RTCPeerConnection();

const makeCall = async (socketId) => {
  console.log(`calling ${socketId}`);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socket.emit('callUser', {
    offer,
    callee: socketId,
  });
};

socket.on('callUser', async ({ offer, caller }) => {
  console.log(`answering ${caller}`);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit('answerUser', { answer, caller });
});

socket.on('answerUser', async ({ answer, callee }) => {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

export { socket as default, makeCall };
