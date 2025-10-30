const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();
app.use(express.json());
app.use(cors());

// 1) MongoDB Connect
mongoose.connect("mongodb+srv://Muskanjanghel:4jXnttQNwMOwIec4@cluster0.m3h66ug.mongodb.net/studentdb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch(err => console.log("❌ Database Connection Error:", err));

// 2) GET - Fetch all students 
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 3) POST - Add new student
app.post("/students", async (req, res) => {
  const { name, course, age, city } = req.body;

  if (!name || !course) {
    return res.status(400).json({ error: "Name and Course are required" });
  }

  const student = new Student({ name, course, age, city });
  await student.save();
  res.json({ message: "Student Added Successfully", student });
});

// 4) PUT - Update student
app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const student = await Student.findByIdAndUpdate(id, updatedData, { new: true });
  res.json({ message: "Student Updated", student });
});

// 5) DELETE - Delete student
app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndDelete(id);
  res.json({ message: "Student Deleted" });
});

// Server Run
app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});