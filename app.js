var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var encoder = require('./encoder.js');

// models
var urlModule = require('./models/url');
var sequences = urlModule.sequences;
var Url = urlModule.Url;

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// return general sequence - last generated id = total urls shortened
app.post('/api/stats', function(req, res) {
  sequences.findOne({_id: 'url_sequence'}, function (err, doc) {
    if (doc) {
      res.send({ url_count: doc.sequence_value });
    } else {
      res.send('N/A');
    }
  });
});

app.post('/api/makeitshort', function(req, res){
    var originalUrl = req.body.url;
    var url = ''; // resulting short url

  // check if long url already exists in database
  Url.findOne({original_url: originalUrl}, function (err, doc){
    if (doc){

      // increment the amount of conversions / request to be shortened
      Url.update({_id: doc._id}, {$set: {conversions: doc.conversions + 1}});

      // shorten existent url and return it
      url = config.webhost + encoder.encode(doc._id);
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
        res.send({'url': url, 'hits': 0});
      });
    }

  });

});

app.get('/:encoded_id', function(req, res){

  var encoded_id = req.params.encoded_id;
  var id = encoder.decode(encoded_id);

  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      Url.update({_id: doc._id}, {$inc: {hits: 1}} , function(err) {
          if (err){
              console.log(err);
          }
      });

      // todo check for http
      res.redirect(doc.original_url);
    } else {
      res.redirect(config.webhost);
    }
  });
});

// check that is not being used from a mocha test
// because the mocha test starts its own app in another port
if (!module.parent) {
  var server = app.listen(3000, function () {
      console.log('Server listening on port 3000 - http://localhost:3000/');
  });
}

module.exports = app;
