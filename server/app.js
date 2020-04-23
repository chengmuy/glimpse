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
  const existingSocket = activeSockets.find((s) => s.id === socket.id);

  // handle connect
  if (!existingSocket) {
    activeSockets.push({ id: socket.id });

    // tell socket about all active sockets
    socket.emit('addUsers', {
      users: activeSockets.filter((s) => s.id !== socket.id),
    });

    // tell all *other* sockets that socket has connected
    socket.broadcast.emit('addUsers', { users: [{ id: socket.id }] });
  }
  console.log(`socket ${socket.id} connected, ${activeSockets.length} active connections`);

  // handle disconnect
  socket.on('disconnect', () => {
    // update active sockets
    activeSockets = activeSockets.filter((s) => s.id !== socket.id);
    console.log(`socket ${socket.id} disconnected, ${activeSockets.length} active connections`);

    // tell all *other* sockets that socket disconnected
    socket.broadcast.emit('removeUser', { id: socket.id });
  });

  // handle call
  socket.on('callUser', ({ offer, to }) => {
    console.log(`calling user ${to} with offer `, offer);
    socket.to(to).emit('callUser', { offer, from: socket.id });
  });
});

module.exports = httpServer;
