const moment = require("moment")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FormLogSchema = new Schema({
  formSubmitted: { type: Object, required: true },
  dateSubmitted: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
  confirmed: { type: String, required: true, default: false },
  dateConfirmed: { type: String }
});

module.exports = FormLog = mongoose.model("formLogs", FormLogSchema);
