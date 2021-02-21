# JSON(Key-Value)_data_storage_system_(API)

>NodeJs(ExpressJs) API to storer Key-value pair that Supports the Basic CRD(Create, Read, Delete) Operations, Data is stored on local storage on User Define Path;

>Problem Statement
![ProblemStatement](https://github.com/anandiiitbh/JSON_data_storage_file/blob/main/IMG/Problem%20Statement.jpeg)

>Requirements: `node` recents and `npm`

>Used `postman` And `Chrome Browser` for testing

>Deploy:
>Download and Extract this repo to your platform and execute this inside the directory
```Bash
npm install
```


- Supports Following Functional Requirements:

> User Registration 
```Javascript
POST->  http://localhost:3000/api/register             //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "name":"UserName",                    //(required)
    "path" : "/Path/Of/Directory/"        // Path of directory is (Optional)
}
```

![User Registration](https://github.com/anandiiitbh/JSON_data_storage_file/blob/main/IMG/1st.png)

> Create And Store New Key-Value pair 
```Javascript
POST->  http://localhost:3000/api/storage/create       //localhost(your_host).... default_port = `3000` (else defined in your `process.env.PORT`
```
```Javascript
 - Body Of above POST method (JSON data)
{
    "id" : 1,                            //UserID (required)
    "key":"Key1",                        //Key (required)
    "data" :{                            //Value (required)
        "Name":"Anand",
        "Course" :" BTech"
    }
}
```

![API call for key-value](https://github.com/anandiiitbh/JSON_data_storage_file/blob/main/IMG/2nd.png)

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
