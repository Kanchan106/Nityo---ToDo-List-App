const express = require("express");
const router = express.Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");

// GET all events
router.get("/", getEvents);

// POST new event
router.post("/", createEvent);

// PUT update event
router.put("/:id", updateEvent);

// DELETE event
router.delete("/:id", deleteEvent);

module.exports = router;