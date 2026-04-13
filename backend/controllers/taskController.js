const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  try {
    const { name, description, time } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Task name is required" });
    }

    const task = new Task({
      user: req.user._id,   // ✅ now filled from middleware
      name,
      description,
      time,
      status: "Pending"
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Task deleted" });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };