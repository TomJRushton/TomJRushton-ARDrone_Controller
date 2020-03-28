var arDrone = require('ar-drone');
var http    = require('http');

console.log('Connecting png stream ...');

//able to take snap shots i guess?
//get the png image from drone camera
var pngStream = arDrone.createClient().getPngStream();

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
    console.log('test');
  });

  var server = http.createServer(function(req, res) {
    if (!lastPng) {
      res.writeHead(503);
      res.end('Did not receive any png data yet.');
      return;
    }

    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(lastPng);
    console.log('update?');
  });


server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');
});
