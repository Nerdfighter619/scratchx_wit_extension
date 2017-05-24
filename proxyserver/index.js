var express = require('express');
var app = express();

app.get('/entity',function(req, res){
	//right now this is just a placeholder
	res.send("THIS WILL MAKE AN ENTITY SOMEDAY");
});

app.listen(3000);