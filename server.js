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

        app.use(express.static(__dirname + '/public'));

        require("./xbox-controller/xbox_controller");
        //require("./video/saveVideo");
        app.listen(3000);

    }
}

