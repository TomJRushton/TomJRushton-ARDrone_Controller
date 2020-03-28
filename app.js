var arDrone = require('ar-drone');
var http    = require('http');

console.log('Connecting png stream ...');

//get the png image from drone camera
var client = arDrone.createClient();
var pngStream = client.getPngStream();

var lastPng;
pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        lastPng = pngBuffer;

        //console.log('test');
    });

var server = http.createServer(function(req, res) {
    if (!lastPng) {
        res.writeHead(503);
        res.end('Did not receive any png data yet.');
        return;
    }

    res.writeHead(200, {'Content-Type': 'image/png'});
    res.setTimeout()
    res.end(lastPng);
    console.log(lastPng);
});


server.listen(8080, function() {
    console.log('Serving latest png on port 8080 ...');
});



//////////////Save Video////////////////////////////
//use broadway.js for displaying the videos on the webapp
var PaVEParser = require('./lib/PaVEParser');
var output = require('fs').createWriteStream('./vid.h264');
var video = client.getVideoStream();
var parser = new PaVEParser();

parser
    .on('data', function(data) {
        output.write(data.payload);
        //console.log(data);
    })
    .on('end', function() {
        output.end();
    });

video.pipe(parser);