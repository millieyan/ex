var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw0503.html');
});

app.get ('/api', function (req, res) {
	var radius=req.query.radius;
	var cx=req.query.cx;
	var cy=req.query.cy;
	var maxx=req.query.maxx;
	var maxy=req.query.maxy;
	var minx=req.query.minx;
	var miny=req.query.miny;
	
	//console.log ('url:' + req.url);
      console.log('box position x:', maxx);
      console.log('box position y',maxy);
      console.log('circle position x',cx);
	  console.log('circle position y',cy);
	  console.log('radius ',radius);

		
	shelljs.exec('check.exe ' + cx +' '+ cy +' '+ maxx +' '+ maxy +' '+ minx +' '+ miny +' '+ radius, function(status, output) {
	
          var output = {
          	status: status,
          	output: output
          };

          /*
            The response header for supporting CORS:
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
          */

		  res.writeHead(200, {
		  	"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
		  });
	
		  res.write(JSON.stringify(output));
		  res.end();

	});
});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (2600, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});
