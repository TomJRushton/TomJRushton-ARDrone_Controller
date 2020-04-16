/**
 * Three seperate servers to launch
 */

module.exports = {
    //launch the server in stream mode utilising drone stream
    launchStreamServer: function(){
        var express = require('express')
            , app = express()
            , server = require("http").createServer(app)

        app.use(express.static(__dirname + '/public'));

        require("./xbox-controller/xbox_controller");
        require("./drone/camera-feed");
        app.listen(3000);
           },

    //launch the viewing server for playback of videos
    launchViewingServer: function (videoChoice) {
        var express = require('express')
            , app = express()
            , server = require("http").createServer(app)

        const RemoteTCPFeedRelay = require('./lib/static');

        app.use(express.static(__dirname + '/public/playbackServer'));
        app.use(express.static(__dirname + '/server/dist'));

        require("./xbox-controller/xbox_controller");

        //used fro selecting videos, change if using custom named files
        var videoPath = "./video/videos/vid" + videoChoice + ".h264";

        //pass the video properties
        var source = {
            width     : 640,
            height    : 360,
            video_path     : videoPath,

            //need to find the lengths of each video
            video_duration : 300,
        };

        const feed    = new RemoteTCPFeedRelay(server, source);

        server.listen(8080);
    },

    //launch the record server to fly and record witht the drone
    launchRecordServer: function () {
        var express = require('express')
            , app = express()
            , server = require("http").createServer(app)

        app.use(express.static(__dirname + '/public'));

        require("./xbox-controller/xbox_controller");

        server.listen(8080);
    }
}

