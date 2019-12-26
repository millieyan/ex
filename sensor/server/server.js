var express = require('express');
var app = express();
var http = require('https');
var fs = require('fs');
var port = process.envPORT || 3000;

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

app.use(express.static(__dirname));

var server = http.createServer(options, app);
server.listen(port,function(){
	console.log('listening on *:' + port);
});

var io = require('socket.io').listen(server);

io.on('connection',function(socket){
	console.log('new connect');
	
	socket.on('disconnect',function(){
		console.log('disconnect');
	});
	socket.on('Singal_From_Phone',function(msg){
		msg.id = socket.id;
		io.emit('Phone_to_THREE',msg);
	});
	
	socket.on('Testing',function(msg){
		console.log(msg.value);
	});
});
