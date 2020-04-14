"use strict";

const http               = require('http');
const express            = require('express');

const RemoteTCPFeedRelay = require('./lib/static');
const app                = express();



  //public website
app.use(express.static(__dirname + '/public/playbackServer'));
app.use(express.static(__dirname + '/server/dist'));

const server  = http.createServer(app);

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




