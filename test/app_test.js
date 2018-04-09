var assert = require('assert');
var http = require('http');
var app  = require(__dirname + '/../app.js');
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

describe('app', function () {

    before (function (done) {
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
        http.get(headers, function (res) {
            // todo - test for specific index content to be present
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    // check if I can encode an url

    // check if encoding is incrementing the hits for a given url

    // check if I can decode a url

    // check if it redirects me when visiting the url
});