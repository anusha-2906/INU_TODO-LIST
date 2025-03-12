const express = require("express");
const Task = require("../models/Task");


const router = express.Router();

router.post("/createtask",  async (req, res) => {
 
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.create({ title, description, dueDate, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task data" });
  }
});


router.get("/gettasks",  async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});


router.get("/gettask/:id",  async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) res.json(task);
  else res.status(404).json({ message: "Task not found" });
});

router.put("/edittask/:id",  async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.completed = req.body.completed ?? task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});


router.delete("/deletetask/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    await task.deleteOne();
    res.json({ message: "Task removed" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

module.exports = router; 

