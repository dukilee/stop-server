const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // allow from anywhere during dev
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('buttonPressed', (data) => {
    console.log('Button pressed:', data);
    socket.broadcast.emit('updateClients', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});