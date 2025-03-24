const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

// Use the port from the env file, or fallback
dotenv.config(); 
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});