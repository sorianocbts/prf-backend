const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CourseSchema = new Schema({
  courseName: { type: String, required: true },
  testName: { type: String, required: true },
  testPassword: { type: String, required: true }
});

module.exports = Course = mongoose.model("courses", CourseSchema);
