"use strict";

const fs           = require('fs');
const Throttle     = require('stream-throttle').Throttle;
const merge        = require('mout/object/merge');

const Server       = require('./serverController');

class StaticFeed extends Server {

  constructor(server, opts) {
    super(server, merge({
      video_path     : null,
      video_duration : 0,
    }, opts));
  }

  //creates the feed, piped at a calculated throttle speed (based off the video duration and size)
  get_feed() {
    var source = this.options.video_path;

      //throttle for "real time simulation"
    var sourceThrottleRate = Math.floor(fs.statSync(source)['size'] / this.options.video_duration);
    console.log("Generate a throttle rate of %s kBps", Math.floor(sourceThrottleRate/1024));

    var readStream = fs.createReadStream(source);
    readStream = readStream.pipe(new Throttle({rate: sourceThrottleRate}));

    console.log("Generate a static feed from ", source);
    return readStream;
  }

}




module.exports = StaticFeed;
