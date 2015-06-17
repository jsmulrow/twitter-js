var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	res.render('index', {title: 'Twitter.js', tweets: tweets});
});

router.get('/users/:name',function(req,res){
	// console.log(req.params.name);
	var name = req.params.name;
	console.log(name);
	var list = tweetBank.find({name:name});
	console.log(list);
	res.render('index',{title: 'Twitter.js - Posts by '+name,tweets:list});
})


router.get('/users/:name/tweets/:id',function(req,res){
	var name = req.params.name;

	var id = parseInt(req.params.id);
	var list = tweetBank.find({id:id});
	console.log(name+id);
	res.render('index',{title:'Twitter.js - Posts by'+name,tweets:list});
})


module.exports = router;