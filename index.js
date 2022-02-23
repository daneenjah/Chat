const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    io.emit('chat message', 'A user connected.');
    socket.on('disconnect', () => {
        io.emit('chat message', 'A user disconnected.'); 
    });
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});