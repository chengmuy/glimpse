const socket = window.io.connect('localhost:4200');

socket.on('addUsers', ({ users }) => {});

export default socket;
