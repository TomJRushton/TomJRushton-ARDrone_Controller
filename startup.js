/**
 * Start up class to allow the user to decide how to start up the drone
 */

console.log("Starting Drone Application..", '\n',"What mode would you like to start in?",
    '\n', "1 => Recording mode", '\n', "2 => Streaming mode", "\n", "3 => Viewing mode", "\n");

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var startUpMode = require('./server');
var videoLocator = require('./video/videoLocator');
var questionsDone = false;

//choose the mode to begin the program in
const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Mode : ', (answer) => {
            if(answer == 1){
                startUpMode.launchRecordServer();
                questionsDone = true;
                resolve()
            }
            if(answer == 2){
                startUpMode.launchStreamServer();
                questionsDone = true;
                resolve()
            }
            if(answer == 3){
                resolve()
            }
            if(answer !== 1 && answer !== 2 && answer !== 3){
                console.log("Please enter a valid option")
            }

        })
    })
}

//asked if viewing server is requested, passes the desired video to the server
const question2 = () => {
    return new Promise((resolve, reject) => {
        console.log("\n");
        videoLocator.findVideos();

        rl.question('Choose a video to be viewed \n', (answer) => {
            //console.log(answer);
            startUpMode.launchViewingServer(answer);
            questionsDone = true;
            resolve()
        })
    })
}

//awaits both questions to be answered
const main = async () => {
    await question1()
    while(questionsDone == false){
        await question2()
    }
    //rl.close()
}

main()


