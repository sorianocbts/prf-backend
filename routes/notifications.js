var express = require("express");
const moment = require("moment")
const sendNotification = require("../functions/sendNotification");

var router = express.Router();

/* GET */
router.get("/", function (req, res, next) {
    res.json({ msg: "success" });
});



// @route   POST api/send-notification
// @desc    POST Notification
// @access  Private
router.post("/", function (req, res, next) {
    if (req.body.pass === process.env.TEMP_POST_PASS) {
        console.log(`Notification at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)

        let eventObj = {
            service: req.body.service,
            sCode: req.body.statusCode
        }
        try {
            sendNotification(eventObj);
            res.json({ msg: `success` });
        } catch (err) {
            console.log(err)
            res.json({ status: 400, msg: 'Bad request' })
        }

    } else {
        res.json({ status: 403, msg: 'Missing passcode' })
    }
});

module.exports = router;
