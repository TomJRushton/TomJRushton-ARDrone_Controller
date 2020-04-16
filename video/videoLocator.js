/**
 * Scans file directory to return all viewable videos
 */

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
var number = 1;

//joining path of directory
const directoryPath = path.join(__dirname, 'videos');

//passing directoryPath and callback function
module.exports = {
    findVideos : function(files){

        //scans the selected directory path for files
        fs.readdir(directoryPath, function (err, files) {

            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(number, file);
                number = number + 1;
            });
        });
    }
};
