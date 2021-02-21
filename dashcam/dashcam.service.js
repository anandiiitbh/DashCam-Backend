const config = require('config.json');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dirPath = './storage/';


module.exports = {
    login,
    alarm,
    location,
    uploadVideo
};

//LOGIN Function 
async function login(imei, res) {
    //Checking Dashcam is priviously Saved or not
    let DashcamsArr = JSON.parse(fs.readFileSync(dirPath + 'dashcam.json'));
    var DashCam = DashcamsArr.find(c => c.imei === imei);
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ imei: imei }, config.secret, { expiresIn: '7d' });
    if (!DashCam) {     //New DashCam(IMEI)
        let t_data = { "id": DashcamsArr.length + 1, "name": "DashCam" + (DashcamsArr.length + 1), "imei": imei, "file": dirPath + "Dashcam" + (DashcamsArr.length + 1) + ".json", "Locfile": dirPath + "Location/LocDashcam" + (DashcamsArr.length + 1) + ".json" };
        DashcamsArr.push(t_data);
        fs.writeFileSync(dirPath + 'dashcam.json', JSON.stringify(DashcamsArr, null, 2)); //Writing New DashCam to DashCam List
        fs.appendFile(t_data.file, '[]', function(err) {    //Creating Particular DashCam's File(JSON) for Alarm Recods 
            if (err) throw err;
        });
        fs.appendFile(t_data.Locfile, '[]', function(err) {     //Creating Particular DashCam's File(JSON) for Location Recods 
            if (err) throw err;
        });
        res.status(200).send({ "DashCam Details": t_data, token });
    } else res.status(200).send({ DashCam, token });
}


//Alarm API calls Handling Function
async function alarm(req, res) {
    //These Alarm Types are valid only
    const alarm_type = ["VIBRATION", "OVERSPEED", "CRASH", "HARD_ACCELERATION", "HARD_BRAKE", "SHARP_TURN"];

    const token = verifyToken(req);
    if (token) {
        jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                res.sendStatus(403).send({ "error": "Invalid Token" });
            } else {
                var Alarm = alarm_type.find(c => c === req.body.alarm_type);
                if (Alarm) {
                    const imei = authData.imei;
                    let DashcamsArr = JSON.parse(fs.readFileSync(dirPath + 'dashcam.json'));
                    var DashCam = DashcamsArr.find(c => c.imei === imei);
                    if (DashCam) {
                        let prevData = JSON.parse(fs.readFileSync(DashCam.file));
                        prevData.push(req.body);
                        fs.writeFileSync(DashCam.file, JSON.stringify(prevData, null, 2));
                        res.status(200).send(req.body);
                    } else res.status(404).send("DashCam Not Found");
                } else res.status(404).send("Alarm Type Not Found");
            }
        });
    } else {
        res.sendStatus(403).send({ "error": "Token Absent" });
    }
}


async function location(req, res) {

    const token = verifyToken(req);
    if (token) {
        jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                res.sendStatus(403).send({ "error": "Invalid Token" });
            } else {
                const imei = authData.imei;
                let DashcamsArr = JSON.parse(fs.readFileSync(dirPath + 'dashcam.json'));
                var DashCam = DashcamsArr.find(c => c.imei === imei);
                if (DashCam) {
                    let prevData = JSON.parse(fs.readFileSync(DashCam.Locfile));
                    prevData.push(req.body);
                    fs.writeFileSync(DashCam.Locfile, JSON.stringify(prevData, null, 2));
                    res.status(200).send(req.body);
                } else res.status(404).send("DashCam Not Found");
            }
        });
    } else {
        res.sendStatus(403).send({ "error": "Token Absent" });
    }
}


function uploadVideo(req, res) {

    let DashcamsArr = JSON.parse(fs.readFileSync(dirPath + 'dashcam.json'));
    var DashCam = DashcamsArr.find(c => c.imei === req.body.imei);
    if (DashCam) {

        let VideoList = JSON.parse(fs.readFileSync(dirPath + 'Videos/video.json'));
        let filename = req.body.imei + req.body.filename;
        VideoList.push({ DashCam, filename });
        fs.writeFileSync(dirPath + 'Videos/video.json', JSON.stringify(VideoList, null, 2));

        the_file.mv(dirPath + 'Videos/' + filename, function(err) {

            res.writeHead(200, { "Content-Type": "video/mp4" });
            if (err) {
                console.log(err);
                res.write(err);
                res.end();
            } else {
                res.write("upload of file " + req.body.filename + " complete");
                res.end();
            }

        });
    }
}

// helper functions

function verifyToken(req) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        return bearerToken;
    } else {
        return false;
    }
}
