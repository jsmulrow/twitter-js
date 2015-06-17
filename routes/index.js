module.exports = function(io) {
	var express = require('express');
	var router = express.Router();
	var tweetBank = require('../tweetBank');
	var bodyParser = require('body-parser');

	var urlencodedParser = bodyParser.urlencoded({extended: false});

	router.get('/', function(req, res) {
		var tweets = tweetBank.list();
		res.render('index', {title: 'Twitter.js', tweets: tweets, showForm: true});
	});

	router.get('/users/:name',function(req,res){
		// console.log(req.params.name);
		var name = req.params.name;
		var list = tweetBank.find({name:name});
		res.render('index',{title: 'Twitter.js - Posts by '+name,tweets:list, showForm: true, name: name});
	});

	router.get('/users/:name/tweets/:id',function(req,res){
		var name = req.params.name;
		var id = parseInt(req.params.id);
		var list = tweetBank.find({id:id});
		res.render('index',{title:'Twitter.js - Posts by'+name,tweets:list});
	});

	// refactor this later
	var hash = function(name){
		var res=0;
		for(var i=0;i<name.length;i++){
			res+=name.charCodeAt(i);
		}
		return res;
	};

	// creating form submission route
	router.post('/submit', urlencodedParser, function(req, res) {
		var name = req.body.name;
		var text = req.body.text;
		if (!text || !name) return;
		tweetBank.add(name, text);
		io.sockets.emit('new_tweet', {name: name, text: text, id: hash(text)});
		// res.redirect('/');
	});

	return router;
};