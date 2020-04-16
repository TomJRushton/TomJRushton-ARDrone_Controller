# A.R Drone Controller
This is a multi layered controller for the Parrot A.R Drone 2.0, allowing for control of the drone using an wired Xbox360 controller
 whist streaming the video feed to a local server.
 
It is also able to record and save videos from the drone, which can then be viewed inside your web page.

## Usage
To start the application run :
```bash
node startup.js
``` 
Then follow the given instruction in the terminal to start the drone program in various modes. The application is set up
for an wired Xbox360 controller but other controllers could be implemented.

**Record Mode** : Allows for drone flight and video recording.

**Stream Mode** : Allows for drone flight with the video feed streamed to the server.

**Viewing Mode** : Allows for playback of a selected recorded video.

## Credits
[131](https://github.com/131/h264-live-player)<br>
[Node-dronestream](https://github.com/bkw/node-dronestream)<br>
[Node-ar-drone](https://github.com/felixge/node-ar-drone)<br>
[Expressjs](https://github.com/expressjs/express)<br>
[Gamepad](https://github.com/creationix/node-gamepad)