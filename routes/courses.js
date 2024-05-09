var express = require("express");
const moment = require("moment")
const nodeSend = require("../functions/nodeMail");

var router = express.Router();
// Course Model
const Course = require("../models/Course");
const FormLog = require("../models/FormLog");

// @route   GET api/courses
// @desc    Get All course data
// @access  Public !!!TODO
router.get("/", function (req, res, next) {
  Course.find()
    .select("-testPassword")
    .then((courses) => res.json(courses));
});

// @route   POST api/courses
// @desc    POST Courses
// @access  Public !!!TODO
router.post("/", function (req, res, next) {
  if (req.body.pass === process.env.TEMP_POST_PASS) {
    Course.insertMany(req.body.courses, function (error, docs) {
      if (error) {
        res.status(404).json(error);
      }
      res.json(docs);
    });
  }
});

// @route   POST api/courses/prf
// @desc    POST PRF
// @access  Public !!!TODO
router.post("/prf", function (req, res, next) {
  // if (req.body.pass === process.env.TEMP_POST_PASS) {
  console.log(`PRF at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
  Course.find({
    courseName: req.body.classCodeSelected,
    testName: req.body.testNumberSelected
  }).then((x) => {
    var submission = new FormLog({
      dateSubmitted: moment().format('MMMM Do YYYY, h:mm:ss a'),
      formSubmitted: {
        submission: req.body,
        passcodeSent: x[0].testPassword
      }
    });
    submission.save((err) => {
      if (err) {
        console.log(err);
      }
      nodeSend(req.body, x[0].testPassword, submission);
      res.json({ msg: `success` });
    });
  });

  // }
});

// @route   POST api/courses/confirm/:subID
// @desc    POST submission confirmation
// @access  Public !!!TODO
router.get("/confirm/:submissionID", function (req, res, next) {
  console.log(`PRF Confirmation at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
  FormLog.findOneAndUpdate({ _id: req.params.submissionID }, { $set: { confirmed: true, dateConfirmed: moment().format('MMMM Do YYYY, h:mm:ss a') } }, { new: true }, function (err, resp) {
    if (err) {
      console.log(err);
    } else {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation</title>
          <style>
            body {
              font-size: 24px; /* Larger font size */
              font-family: Arial, sans-serif; /* Optional: improves readability */
            }
          </style>
        </head>
        <body>
          <p>Thank you! Your confirmation has been processed.</p>
        </body>
        </html>
      `);
    }
  })

});

// @route   GET api/courses/confirm/
// @desc    GET Logs
// @access  Public !!!TODO
router.get("/confirm", function (req, res, next) {
  console.log(`PRF get Confirmation at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
  FormLog.find().select("-formSubmitted.passcodeSent")
    .then((logs) => res.json(logs));

});




module.exports = router;
