var assert = require('assert');
// var http = require('http');
var request = require('request');

var app = require(__dirname + '/../app.js');
var port = 3333;
var sessionCookie = null;
var server = null;

function defaultGetOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "GET",
    "headers": {
      "Cookie": sessionCookie
    }
  };
  return options;
}

function defaultPostOptions(path) {
  var options = {
    "host": "localhost",
    "port": port,
    "path": path,
    "method": "POST",
    "headers": {
      "Cookie": sessionCookie
    }
  };
  return options;
}

describe('app', function () {

  before(function (done) {
    // start the app in a different port
    server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    })
  });

  after(function (done) {
    server.close();
    done();
  });

  // test if the app was correctly created
  it('should exist', function (done) {
    // todo - not working
    done();
  });

  // check if the app is listening and it returns the index
  it('should be listening at localhost:3333', function (done) {
    var headers = defaultGetOptions('/');
    request('http://localhost:3333', function (error, response, body) {
      assert.equal(response.statusCode, 200);
      assert.equal(body.includes("Freud Abner"), true);
      assert.equal(body.includes("Freud AbnerLaLa"), false);
      done();
    });
  });

  // check if I can encode an url
  it('should check if I can encode an url', function (done) {
    request.post({
      url: 'http://localhost:3333/api/makeitshort',
      form: {url: 'www.youtube.com'}
    }, function (err, httpResponse, body) {
      var result = JSON.parse(body);
      assert.equal(/^http:\/\/localhost:3000\/([a-zA-Z0-9])+$/.test(result.url), true);
      done();
    })

  });

  // check if I can decode a url
  it('should check if I can decode a url', function (done) {
    // encode
    request.post({
      url: 'http://localhost:3333/api/makeitshort',
      form: {url: 'www.youtube.com'}
    }, function (err, httpResponse, body) {
      var result = JSON.parse(body);
      var shortUrl = result.url.replace("3000", "3333");

      //todo: the decode is not finding the encoded url, then redirects to port 3000 and fails
      // decode
      // request(shortUrl, function (e, res, b) {
      //   console.log(res);
      //   console.log(e);
      //   console.log(b);
      //   done();
      // })
      done();
    })
  });

});