var arDrone = require('ar-drone');
var client = arDrone.createClient();
var controls = {};

controls.takeoff = function () {
    client.takeoff();
    console.log('taking off...');
}

controls.climb = function () {
    client.up(1);
    console.log('gaining altitude');
}

controls.descend = function () {
    client.down(1);
    console.log('loosing altitude');
}

controls.land = function(){
    client.land();
    console.log('landing...')
}

controls.turnRight = function () {
    client.clockwise(0.5);
    console.log('turning right');
}

controls.turnLeft = function () {
    client.clockwise(-0.5);
    console.log('turning left');
}

controls.stopTurning = function () {
    client.clockwise(0);
    console.log('stopping turning');
}

controls.moveForwards = function () {
    client.front(1);
    console.log('moving forwards');
}

controls.moveBackwards = function () {
    client.back(0.8);
    console.log('moving backwards');
}

controls.stopMoving = function () {
    client.stop();
    console.log('stopping moving');
}

controls.flipAhead = function () {
    client.animate('flipAhead', 500);
    console.log('flip ahead');
}

controls.flipBack = function () {
    client.animate('flipBehind', 500);
    console.log('flip backwards');
}

module.exports = controls;

