const express = require('express');
const router = express.Router();
const dashcamService = require('./dashcam.service');

// routes
router.post('/', dashcam);      //  Login, Alarm, Location
router.post('/uploadVideo', uploadVideo);   //  Vido Upload

module.exports = router;

function dashcam(req, res) {
    if (req.body.type === 'LOGIN') {
        dashcamService.login(req.body.imei, res);
    }
    if (req.body.type === 'ALARM') {
        dashcamService.alarm(req, res);
    }
    if (req.body.type === 'LOCATION') {
        dashcamService.location(req, res);
    }
}

function uploadVideo(req, res) {
    dashcamService.uploadVideo(req, res);
}
