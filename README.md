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

![User Registration](https://github.com/anandiiitbh/DashCam-Backend/blob/main/storage/img/login.png)

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
```

![API call for key-value](https://github.com/anandiiitbh/DashCam-Backend/blob/main/storage/img/22.png)

> Read Operation API call
```Javascript
POST->  http://localhost:3000/api/storage/read             //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id":1,                             //UserID (required)
    "key":"Key1"                        //Key of the data to fetch (required)
}
```

![Reading Data](https://github.com/anandiiitbh/JSON_data_storage_file/blob/main/IMG/3rd.png)

> Delete Operation API call
```Javascript
POST->  http://localhost:3000/api/storage/remove             //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id" : 1,                       //UserID (required)
    "key":"Key1"                    //Key of the data to be deleted (Required)
}
```

![Deleting Data](https://github.com/anandiiitbh/JSON_data_storage_file/blob/main/IMG/4th.png)


- Implemented Non Functional Requirement 

> The Size of File Storing data will never exceed `1GB`
```Javascript
//File Size Check Befor Data Storing 
function fileSize(fileName){
    var stats = fs.statSync(fileName)
    var fileSizeInBytes = stats.size;
    var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
    return  fileSizeInMegabytes<1024?true:false
}
```

> More than one client process cannot be allowed to use same file to write
```Javascript
//This is achieved by using synchronize methods to write and read data of nodeJs (File System)
fs.writeFileSync(dirPath+'user.json',JSON.stringify(users, null, 2));
fs.readFileSync(dirPath+'user.json')
```

>Thank You... [Visit Again For Updates :) ]
