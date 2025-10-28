const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  },
  city: {
    type: String,
    default: "Unknown"
  }
});

module.exports = mongoose.model("Student", studentSchema);