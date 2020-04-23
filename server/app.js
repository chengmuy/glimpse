const path = require('path');
const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const io = socketIO(httpServer);

let activeSockets = [];

console.log(path.join(__dirname, '../client/build/static'));
app.use(express.static(path.join(__dirname, '../client/build/')));

app.use(morgan('dev'));

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  const existingSocket = activeSockets.find((s) => s === socket.id);

  if (!existingSocket) {
    activeSockets.push(socket.id);

    // tell socket about all active sockets
    socket.emit('updateUserList', {
      users: activeSockets.filter((s) => s !== socket.id),
    });

    // tell all *other* sockets that socket has connected
    socket.broadcast.emit('updateUserList', { users: [socket.id] });
  }

  // handle disconnect
  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);

    // update active sockets
    activeSockets = activeSockets.filter((s) => s !== socket.id);

    // tell all *other* sockets that socket disconnected
    socket.broadcast.emit('disconnectUser', { socketId: socket.id });
  });
});

module.exports = httpServer;
