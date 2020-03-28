var arDrone = require('ar-drone');
var client = arDrone.createClient();
var gamepad = require("gamepad");
var path = require('path');
var config = require(path.join(__dirname, 'config.json'));
var _ = require('lodash');
var controls = require('../drone/drone-controlls');

gamepad.init()

//List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
     console.log(i, gamepad.deviceAtIndex());
}

setInterval(gamepad.processEvents, 16);
setInterval(gamepad.detectDevices, 500);

var getControlName = function(controlId, controlGroup) {
    return _.find(config.mappings[controlGroup], { 'id': controlId }).name;
};

// var getControlFunction = function(controlId, controlGroup) {
//     return _.find(config.mappings[controlGroup], { 'id': controlId }).name;
// };

var handleButtonPress = function(id, num){
    handleButton(id, num, "pressed");
    console.log("test");
};
var handleButtonRelease = function(id, num){
    handleButton(id, num, "released");
    console.log("test23113");

};
var handleAxisMove = function(id, axisId, value) {
        var axisName = getControlName(axisId, "axes");
        //console.log(axisName);
        //self.emit("move", _.toLower(axisName), value);
};

var handleButton = function(id, num, eventName) {
    var buttonName = getControlName(num, "buttons");
    console.log(buttonName, eventName);
    // var movement = getControlFunction(buttonName,"movements");
    executeButtonCommands(buttonName, eventName);
    //self.emit(eventName, _.toLower(buttonName))
     };


gamepad.on("move", function (id, axis, value) {
    handleAxisMove(id, axis, value);});
gamepad.on("up", function (id, num) {
    handleButtonRelease(id, num)});
gamepad.on("down", function (id, num) {
    handleButtonPress(id, num)});

var executeButtonCommands = function (buttonName, eventName) {
    if(buttonName == 'Start'){
        client.takeoff();
        controls.takeoff();
    }
    if(buttonName == 'Select'){
        controls.land();
        client
        .after(2000, function() {
            this.land();
        });
    }
    if(buttonName == 'A'){
        controls.climb();
    }
    if(buttonName == 'B'){
        controls.descend();
    }
    // if(buttonName = 'A'){
    //     controls.takeoff();
    // }
    // if(buttonName = 'A'){
    //     controls.takeoff();
    // }
    //console.log(controls.takeoff());
};