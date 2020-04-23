const path = require('path');
const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');
const { createServer } = require('http');
const { generateWord } = require('./wordGenerator');

const app = express();
const httpServer = createServer(app);
const io = socketIO(httpServer);

let gs = {};
let hiddenState = { word: null };
resetGame();

let activeUsers = [];
let serverSockets = io.sockets.sockets;

app.use(express.static(path.join(__dirname, '../client/build/')));

app.use(morgan('dev'));

io.on('connection', (socket) => {
  const existingSocket = activeUsers.find((s) => s.id === socket.id);

  // handle connect
  if (!existingSocket) {
    activeUsers.push({ id: socket.id });

    // tell socket about all active sockets
    socket.emit('addUsers', {
      users: activeUsers.filter((s) => s.id !== socket.id),
    });

    // tell all *other* sockets that socket has connected
    socket.broadcast.emit('addUsers', { users: [{ id: socket.id }] });
  }
  socket.emit('id', socket.id);
  console.log(`socket ${socket.id} connected, ${activeUsers.length} active connections`);

  // handle disconnect
  socket.on('disconnect', () => {
    // update active sockets
    activeUsers = activeUsers.filter((u) => u.id !== socket.id);
    console.log(`socket ${socket.id} disconnected, ${activeUsers.length} active connections`);

    // tell all *other* sockets that socket disconnected
    socket.broadcast.emit('removeUser', { id: socket.id });
  });

  // handle call
  socket.on('callUser', ({ offer, callee }) => {
    console.log(`${socket.id} calling user ${callee}`);
    socket.to(callee).emit('callUser', { offer, caller: socket.id });
  });

  // handle user
  socket.on('answerUser', ({ answer, caller }) => {
    console.log(`${socket.id} answering user ${caller}`);
    socket.to(caller).emit('answerUser', { answer, callee: socket.id });
  });

  socket.on('startGame', () => {
    console.log('startGame received');
    // reset game state
    resetGame();
    // initialize game
    initializeGame(socket.id);
    console.log('gameState: ', gs);
    console.log('hiddenState: ', hiddenState);
    // broadcast to all sockets
    io.emit('gameUpdate', gs);
    io.to(gs.actor.id).emit('wordUpdate', hiddenState);

    // assign to rooms
  });

  // applyGameHandlers(socket);
});

function resetGame() {
  gs = { status: 'not-started', teams: { red: [], blue: [] }, actor: null };
  hiddenState = { word: null };
}

function initializeGame(actorId) {
  gs.status = 'active';
  gs.teams = {
    red: activeUsers.filter((_, ind) => ind % 2 === 0),
    blue: activeUsers.filter((_, ind) => ind % 2 === 1),
  };
  gs.actor = activeUsers.find((u) => u.id === actorId);
  hiddenState.word = generateWord();
}

module.exports = httpServer;
