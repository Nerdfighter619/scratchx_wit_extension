var express = require('express');
var request = require('request');
var cors =require('cors');
var app = express();

//allow cross-domain requests
app.use(cors())

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
app.post('/validate/:token/:message/:entities/:values',function(req, res){
	var auth_token = 'Bearer '
	auth_token += req.params.token

	//something to fix the message goes here
	message = decodeURI(req.params.message)
	message = message.replace('%3F','?')

	var headers = {
		'Authorization': auth_token,
		'Content-Type': 'application/json'
	}

	var input = '[{"text":"'
	input += message
	input += '","entities":[{"entity":"'

	//make this work for multiple entities
	input += req.params.entities
	input += '","value":"'
	input += req.params.values
	input += '"}]}]'

	console.log(input)

	var options = {
		url: 'https://api.wit.ai/samples?v=20170506',
		method: 'POST',
		headers: headers,
		form: input
	}

	request(options, function(error,response,body){
		console.log(body)
	})

	res.send('success!');
});


app.listen(3000);