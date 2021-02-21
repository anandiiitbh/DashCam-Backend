# TruckX Assignment

>NodeJs(ExpressJs) APIs to communicate with CAR DashCam;

>Problem Statement
 1. Dashcam sends the alarms to the backend for events like a crash, harsh brake, etc..
 2. Records short video clips for the above alerts and post it to backend
 3. Receive commands from backend for configuration

>Requirements: `node` recents and `npm`

>Used `postman` And `Chrome Browser` for testing

>Deploy:
>Download and Extract this repo to your platform and execute this inside the directory
```Bash
npm install
```


- Messages from Dashcam to the backend:

> Login message 
```Javascript
POST->  http://localhost:6000/dashcam/        //localhost(your_host).... default_port = `6000` (else defined in your `process.env.PORT
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "type":"LOGIN",
    "imei":12345678         IMEI of Particular DashCam
}
```  
if a new imei is passed API will treate it as a new DashCam. And start saving its Record as well
```Javascript
 - Response Of above POST method (JSON data)
{
    "DashCam": {
        "id": 1,
        "name": "DashCam1",
        "imei": 12345678,
        "file": "./storage/Dashcam1.json",
        "Locfile": "./storage/Location/LocDashcam1.json"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWVpIjoxMjM0NTY3OCwiaWF0IjoxNjEzOTAwNjAxLCJleHAiOjE2MTQ1MDU0MDF9.XQoVn4RGetWl9KNGMFpdAynm9W0fEE9Fxq3Tw9aiFXI"
}
    //JWT Token for Later Communication Auth. 
```

![DashCam Registration/Login](https://github.com/anandiiitbh/DashCam-Backend/blob/main/storage/img/login.png)  



> Alarm message
```Javascript
POST->  http://localhost:6000/dashcam       //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "type": "ALARM",
    "alarm_type": "CRASH",
    "alarm_time": "2020-08-18 16:45:35",
    "latitude": 32.378903,
    "longitude": -122.457324,
    "file_list": ["a.mp4", "b.mp4"]
}
```  
```Javascript
 - Authorization needed for above POST method (JSON data)
   headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWVpIjoxMjM0NTY3OCwiaWF0IjoxNjEzODg1MjIyLCJleHAiOjE2MTQ0OTAwMjJ9.7fcK36xX26WNKaMMcO89xMCTu7d00MOkAB7zN66fTF0', 
    'Content-Type': 'application/json'
  }
  // Token For Auth.
```  
Each Alarm Call for each Dashcam will be saved at backend `storage/DashCam(name).json` and the whole Backend is persistence.

![Alarm Message](https://github.com/anandiiitbh/DashCam-Backend/blob/main/storage/img/22.png)  


> Location message
```Javascript
POST->  http://localhost:6000/dashcam       //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
"type": "LOCATION",
"location_time": "2020-08-18 16:45:35",
"latitude": 32.378903,
"longitude": -122.457324
}
```  
```Javascript
 - Authorization needed for above POST method (JSON data)
   headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWVpIjoxMjM0NTY3OCwiaWF0IjoxNjEzODg1MjIyLCJleHAiOjE2MTQ0OTAwMjJ9.7fcK36xX26WNKaMMcO89xMCTu7d00MOkAB7zN66fTF0', 
    'Content-Type': 'application/json'
  }  
  // Token For Auth.
```  
Each Location Call for each Dashcam  will be saved at backend `storage/Location/DashCam(name).json` and the whole Backend is persistence.

![Location Message](https://github.com/anandiiitbh/DashCam-Backend/blob/main/storage/img/Screenshot_2021-02-21_15-14-29.png)  


- Video Upload Message:  

```Javascript
POST->  http://localhost:6000/dashcam/uploadVideo            //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
 "imei" : 12345678,
 "filename" : "sample.mp4",
 "data" : video_data
}
```  
Video will be saved at backend `storage/Videos/(imei+filename).mp4` and the whole Backend is persistence.

- Messages from the backend to Dashcam:  

>Write `cmd` at terminal where Server is started. 

```shell
      > node ./server.js

     Server listening on port 6000
     Enter `cmd` to Send Commands to DashCam
     cmd
     IP of DashCam : 127.0.0.1   //IP of DashCam
     PORT of DashCam : 5051      //Open PORT for comm.(make sure ip:port of dashcam is open)
     CONNECTED TO: 127.0.0.1:5051
     For Reboot Enter `1` For Configure IP:PORT Enter `2`: 1
     Response DATA: { ‘type’: ‘COMMAND_RESPONSE’, ‘response’: ‘OK’ }

     Connection closed
```

used TCP Socket Programming .. Akc(https://www.hacksparrow.com/nodejs/tcp-socket-programming-in-node-js.html)  

                       Backend                                                       DashCam

![Messages from the backend to Dashcam](https://github.com/anandiiitbh/DashCam-Backend/blob/main/storage/img/Screenshot_2021-02-21_15-22-22.png)  


>Thank You... [Visit Again For Updates :) ]
