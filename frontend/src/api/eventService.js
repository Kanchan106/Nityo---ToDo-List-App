import axios from "axios";
import authHeader from "../utils/authHeader";

const API_URL = "http://localhost:5000/api/events";

// Get events
export const getEvents = async () => {
  const res = await axios.get(API_URL, { headers: authHeader() });
  return res.data;
};

// Create event
export const createEvent = async (eventData) => {
  const res = await axios.post(API_URL, eventData, { headers: authHeader() });
  return res.data;
};

// Update event
export const updateEvent = async (id, eventData) => {
  const res = await axios.put(`${API_URL}/${id}`, eventData, { headers: authHeader() });
  return res.data;
};

// Delete event
export const deleteEvent = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  return res.data;
};