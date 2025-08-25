// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  path: String,
  image: String,
  classLevel: String, // e.g., "Class 12", "JEE", "NEET"
  isLive: { type: Boolean, default: false }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
