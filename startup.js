console.log("Starting Drone Application..", '\n',"What mode would you like to start in?",
    '\n', "1 => Recording mode", '\n', "2 => Streaming mode");

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var startUpMode = require('./server');

rl.on('line', (input) => {

    if(input != 1 && input != 2){
        console.log("Please choose a valid option")
    }else{
        if(input == 1){
            startUpMode.launchRecordServer();
        }
        if(input == 2){
            startUpMode.launchStreamServer();
        }
    }
});