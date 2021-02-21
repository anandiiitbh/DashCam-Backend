require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const readline = require("readline");
var net = require('net');
const errorHandler = require('_helpers/error-handler');
const fileUpload = require('express-fileupload');


app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/dashcam', require('./dashcam/dashcam.controller'));

// global error handler
app.use(errorHandler);



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port);

    // Command From Backend to DashCam 
    console.log('Enter `cmd` to Send Commands to DashCam');

    rl.on('line', function(line, lineCount, byteCount) {
        if (line === 'cmd') {

            //Ask for IP:PORT of Particular DashCam 
            rl.question("IP of DashCam : ", function(IP) {
                rl.question("PORT of DashCam : ", function(PORT) {
                    var client = new net.Socket();
                    client.connect(PORT, IP, function() {
                        console.log('CONNECTED TO: ' + IP + ':' + PORT);
                        rl.question("For Reboot Enter `1` For Configure IP:PORT Enter `2`: ", function(option) {
                            if (option === '1') {
                                client.write('{"type": "COMMAND","imei": 12345678,"command": "Reboot"}');
                            } else if (option === '2') {
                                client.write('{"type": "COMMAND","imei": 12345678,"command": "Configure IP:PORT"}');
                            } else {
                                client.write('Enter `cmd` to Send Commands to DashCam');
                            }
                        });
                    });

                    //Get Response from DashCam and close connection
                    client.on('data', function(data) {
                        console.log('DATA: ' + data);
                        client.destroy();
                    });

                    // Add a 'close' event handler for the client socket
                    client.on('close', function() {
                        console.log('Connection closed');
                    });
                });
            });
        }
    })


});