var arDrone = require('ar-drone');
var PaVEParser = require('../lib/PaVEParser');
var number = 1;
const vidChecker = require('fs');
var path = "./video/videos/vid" + number + ".h264";

console.log(path);


var output = require('fs').createWriteStream(path);
var video = arDrone.createClient({ip: "192.168.1.1"}).getVideoStream();
//var video = require('dronestream').listen(3001);
var parser = new PaVEParser();

parser
    .on('data', function(data) {
        output.write(data.payload);
        //console.log(data);
    })
    .on('end', function() {
        output.end();
    });

module.exports = {
    saveVid: function(){
        video.pipe(parser)    }
}


