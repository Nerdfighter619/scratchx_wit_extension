var express = require('express');
var request = require('request');
var app = express();

//make entity
app.post('/entity/:token/:entity',function(req, res){
	var auth_token = 'Bearer '
	auth_token += req.params.token

	var input = '{"id":"'
	input += req.params.entity
	input += '"}'
	var headers = {
		'Authorization': auth_token,
		'Content-Type': 'application/json'
	}

	var options = {
		url: 'https://api.wit.ai/entities?v=20170524',
		method: 'POST',
		headers: headers,
		form: input
	}

	request(options, function(error,response,body){
		console.log(body)
	})

	res.send('success!');
});

//validate example sentance


app.listen(3000);