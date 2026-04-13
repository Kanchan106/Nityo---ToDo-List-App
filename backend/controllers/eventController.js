const Event = require("../models/Event");

// GET all events
const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// CREATE event
const createEvent = async (req, res) => {
  const { name, date } = req.body;
  const event = new Event({ name, date });
  const saved = await event.save();
  res.status(201).json(saved);
};

// UPDATE event
const updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE event
const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };