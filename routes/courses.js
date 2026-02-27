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
          <title>CBTS Proctor Confirmation</title>
          <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 40px;
              font-family: 'Libre Baskerville', serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: #f0f0f0;
            }
            .container {
              background: white;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              text-align: center;
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Thank You!</h1>
            <p>Your CBTS Proctor confirmation has been processed successfully.</p>
          </div>
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



// CBTS HUB

// @route   POST api/courses/hub
// @desc    POST PRF
// @access  Public !!!TODO
// router.post("/hub", function (req, res, next) {
//   // if (req.body.pass === process.env.TEMP_POST_PASS) {
//   console.log(`PRF at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
//   Course.find({
//     courseName: req.body.classCodeSelected,
//     testName: req.body.testNumberSelected
//   }).then((x) => {
//     var submission = new FormLog({
//       dateSubmitted: moment().format('MMMM Do YYYY, h:mm:ss a'),
//       formSubmitted: {
//         submission: req.body,
//         passcodeSent: x[0].testPassword
//       }
//     });
//     submission.save((err) => {
//       if (err) {
//         console.log(err);
//       }
//       // nodeSend(req.body, x[0].testPassword, submission);
//       res.json({ "submission_id":submission._id });
//     });
//   });

//   // }
// });


// @route   POST api/courses/hub
// @desc    POST PRF (accept payload, validate, record)
// @access  Public (you should still add auth/secret)
router.post('/hub', async function (req, res) {
  try {
    console.log(`PRF at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);

    const body = req.body || {};

    // Existing fields (legacy)
    const classCodeSelected = String(body.classCodeSelected || '').trim();

    // Existing field (required)
    const testNumberSelected = String(body.testNumberSelected || '').trim();

    // Optional new fields (Option B)
    const courseCode = String(body.courseCode || '').trim().toUpperCase();
    const courseYearRaw = body.courseYear;

    const courseYear =
      courseYearRaw == null || courseYearRaw === ''
        ? null
        : Number(courseYearRaw);

    // --- Required checks ---
    if (!testNumberSelected) {
      return res.status(400).json({ error: 'Missing testNumberSelected' });
    }

    // You must have either classCodeSelected OR courseCode
    if (!classCodeSelected && !courseCode) {
      return res
        .status(400)
        .json({ error: 'Missing classCodeSelected (or courseCode)' });
    }

    // --- Format/type validation (course info only) ---
    // Validate year if present
    if (courseYearRaw != null && courseYearRaw !== '' && Number.isNaN(courseYear)) {
      return res.status(400).json({ error: 'Invalid courseYear' });
    }
    if (courseYear != null) {
      const yearInt = Math.trunc(courseYear);
      // adjust bounds to your domain
      if (!Number.isFinite(courseYear) || courseYear !== yearInt) {
        return res.status(400).json({ error: 'courseYear must be an integer' });
      }
      if (yearInt < 1990 || yearInt > 2100) {
        return res.status(400).json({ error: 'courseYear out of range' });
      }
    }

    // Optional: validate courseCode format if present (example: BI13, CS101, etc.)
    // Pick a regex that matches YOUR real codes.
    if (courseCode) {
      const COURSE_CODE_RE = /^[A-Z]{2,6}\d{1,4}$/; // example only
      if (!COURSE_CODE_RE.test(courseCode)) {
        return res.status(400).json({ error: 'Invalid courseCode format' });
      }
    }

    // Optional: validate testNumberSelected format (example only)
    // If it's numeric or like "Test 1", enforce whatever you want here.
    // const TEST_RE = /^[A-Za-z0-9 _-]{1,32}$/;
    // if (!TEST_RE.test(testNumberSelected)) ...

    // --- Normalized courseInfo (consistent storage) ---
    const courseInfo = {
      // legacy field (if they used it)
      classCodeSelected: classCodeSelected || null,
      // option B fields (if they used them)
      courseCode: courseCode || null,
      courseYear: courseYear ?? null,
      // always present
      testNumberSelected,
    };

    const submission = new FormLog({
      dateSubmitted: moment().format('MMMM Do YYYY, h:mm:ss a'),
      formSubmitted: {
        submission: body,       // raw payload exactly as received
        courseInfo,             // normalized + validated subset
        // passcodeSent: null,   // keep field if schema expects it; otherwise omit
      },
    });

    await submission.save();

    return res.json({ submission_id: submission._id });
  } catch (err) {
    console.error('PRF /hub error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
