module.exports = {
    launchStreamServer: function(){
        var express = require('express')
            , app = express()
            , server = require("http").createServer(app)

        app.use(express.static(__dirname + '/public'));

        require("./xbox-controller/xbox_controller");
        require("./drone/camera-feed");
        app.listen(3000);
           },

    launchRecordServer: function () {
        var express = require('express')
            , app = express()
            , server = require("http").createServer(app)

        const RemoteTCPFeedRelay = require('./lib/static');

        app.use(express.static(__dirname + '/public/playbackServer'));
        app.use(express.static(__dirname + '/server/dist'));

        require("./xbox-controller/xbox_controller");
        //require("./video/saveVideo");

        var source = {
            width     : 480,
            height    : 270,

            video_path     : "samples/admiral.264",
            video_duration : 58,
        };

        source = {
            width     : 640,
            height    : 360,

            video_path     : "video/videos/vid1.h264",
            video_duration : 300,
        };

        const feed    = new RemoteTCPFeedRelay(server, source);

        server.listen(8080);
    }
}

