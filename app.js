var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var encoder = require('./encoder.js');

// models
var urlModule = require('./models/url');
var Url = urlModule.Url;

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


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
    var originalUrl = req.body.url;
    var url = ''; // resulting short url

  // check if url already exists in database
  Url.findOne({original_url: originalUrl}, function (err, doc){
    if (doc){
      url = config.webhost + encoder.encode(doc._id);

      // return existent
      res.send({'url': url, 'hits': doc.hits});
    } else {
      // create a new one
      var newUrl = Url({
        original_url: originalUrl
      });

      // save the new link
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }

        // encode the url
        url = config.webhost + encoder.encode(newUrl._id);

        // return the url to show it
        res.send({'url': url});
      });
    }

  });

});

app.get('/:encoded_id', function(req, res){
    // redirect
});

var server = app.listen(3000, function () {
    console.log('Server listening on port 3000 - http://localhost:3000/');
});

module.exports = app;
