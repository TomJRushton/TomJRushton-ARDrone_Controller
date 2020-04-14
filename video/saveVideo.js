var arDrone = require('ar-drone');
var PaVEParser = require('../lib/PaVEParser');
var number = 1;
const vidChecker = require('fs');
var path = "./video/videos/vid" + number + ".h264";

//Checks for existing videos, updating the video number if found
while(vidChecker.existsSync(path)){
    number = number + 1;
    path = "./video/videos/vid" + number + ".h264";
}

var output = require('fs').createWriteStream(path);
var parser = new PaVEParser();
var video;
module.exports = {
    startRecording: function(){
        video = arDrone.createClient({ip: "192.168.1.1"}).getVideoStream();
    },

    //Exports the pipe function so the user can control when the video is saved
    saveVid: function(){
        video.pipe(parser)}
}

//Parses the video data through the PaVEParser to redact the custom framing
parser
    .on('data', function(data) {
        output.write(data.payload);
        //console.log(data);
    })
    .on('end', function() {
        output.end();
    });
