var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/stats', function(req, res) {
    // return stats
});

app.post('/api/makeitshort', function(req, res){
    // make a short url, save, etc
});

app.get('/:encoded_id', function(req, res){
    // redirect
});

var server = app.listen(3000, function () {
    console.log('Server listening on port 3000 - http://localhost:3000/');
});

module.exports = app;
