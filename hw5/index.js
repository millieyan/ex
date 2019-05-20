const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/views/index.html');
});


let onlineCount = 0;

io.on('connection', (socket) => {
	
 
    onlineCount++;

    io.emit("online", onlineCount);
	 socket.on("send", (msg) => {
  
    if (Object.keys(msg).length < 2) return;
    io.emit("msg", msg);
});

    socket.on("greet", () => {
        socket.emit("greet", onlineCount);
    });

    socket.on('disconnect', () => {
  
        onlineCount = (onlineCount < 0) ? 0 : onlineCount-=1;
        io.emit("online", onlineCount);
    });
});

server.listen(3000, () => {
    console.log("Server Started. http://localhost:3000");
});
