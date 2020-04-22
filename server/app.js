const path = require('path');
const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer = createServer(app);
const io = socketIO(httpServer);

console.log(path.join(__dirname, '../client/build/static'));
app.use(express.static(path.join(__dirname, '../client/build/')));

app.use(morgan('dev'));

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

io.on('connection', () => {
  console.log('socket connected');
});

module.exports = httpServer;
