var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var app = express();
var socketio = require('socket.io');

var server = app.listen(3000, function(e) {
	console.log('Server listening');
});

var io = socketio.listen(server);

var routes = require('./routes/');
app.use('/', routes(io));

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({cache: false});


app.get('/', function(req, res) {
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render('index', {title: 'Hall of Fame', people: people} );
});



