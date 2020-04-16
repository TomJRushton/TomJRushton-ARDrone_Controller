/**
 * This class intergrates the gamepad library with he drone controls
 */

var gamepad = require("gamepad");
var arDrone = require('ar-drone');
var program = require('commander');

/**
 * Setup command-line options.
 */

program
    .version(require('../package.json').version)
    .option('-i, --ip [val]', 'drone IP address or hostname to connect to (default: "192.168.1.1")', '192.168.1.1')
    .option('-c, --controls [mode]', 'controller configuration to use (default: "xbox")', 'xbox')
    .parse(process.argv);


 //Attempt to load the requested config.
var config = require('./config/' + program.controls);
console.log('Loaded %j config', program.controls);


 //Create client connection to the AR.Drone.
var client  = arDrone.createClient({ ip: program.ip });
console.log('Connecting to drone at %j', program.ip);


//Show remaining battery percentage from navdata in console
var battery = null;
//Only show the battery change every 5%
client.on('navdata', function (navdata) {
    if (navdata && navdata.demo && navdata.demo.batteryPercentage && battery !== navdata.demo.batteryPercentage) {
        battery = navdata.demo.batteryPercentage;
        if((battery % 5) == 0){
            console.log("Battery percentage:", battery);
        }
        //document.getElementById('battery-indicator').value = battery;
    }
});

/**
 * Init Gamepad library
 */

// Initialize the library
gamepad.init();

// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
    console.log(i, gamepad.deviceAtIndex());
}

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Listen for move events on all gamepads
gamepad.on("move", function (id, axis, value) {
    data = config.axis[axis];
    //console.log(value);
    if (!data) return;
    func = data[value > 0 ? 1 : 0];
    client[func](Math.abs(value));
});

// Listen for button down events on all gamepads
gamepad.on("down", function (id, num) {
    data = config.buttons[num];
    if (!data) return;
    func = data[0];
    //Each function takes different values so most had to be split up
    if(num == 3){
        console.log("id: " + id + ", value: " + num, func);
        client[func](1);
    }
    if(num == 2){
        console.log("id: " + id + ", value: " + num, func);
        client[func](-1);
    }
    if(num == 0){
        console.log("id: " + id + ", value: " + num, func);
        client[func](1);
    }
    if(num == 1){
        console.log("id: " + id + ", value: " + num, func);
        client[func](0.8);
    }
    if(num == 10){
        console.log("id: " + id + ", value: " + num, func);
        client[func](1);
    }
    if(num == 11){
        console.log("id: " + id + ", value: " + num, func);
        client[func](-0.8);
    }
    if(num != 3 && num != 2 && num != 10 && num != 11 && num != 1 && num != 0 && num != 12 && num != 13){
        console.log("id: " + id + ", value: " + num, func);
        client[func]();
    }


    //Start recording
    if(num == 12){
        var record = require('../video/saveVideo');
        record.startRecording();
        console.log("Started Recording");
    }
    //Stop recording
    if(num == 13){
        var record = require('../video/saveVideo');
        record.saveVid();
        console.log("Stopped Recording");
    }


});
