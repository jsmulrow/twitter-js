var express = require('express');
var app = express();

var morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.listen(3000, function(e) {

	// var host = server.address().address;
	// var port = server.address().port;

	console.log('Server listening');
});