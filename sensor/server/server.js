var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.envPORT || 3000;

app.use(express.static(__dirname));

io.on('connection',function(socket){
	console.log('new connect');
	
	socket.on('disconnect',function(){
		console.log('disconnect');
	});
	socket.on('Singal_From_Phone',function(msg){
		console.log('bang');
		io.emit('Phone_to_THREE',msg);
	});
});

http.listen(port,function(){
	console.log('listening on *:' + port);
});