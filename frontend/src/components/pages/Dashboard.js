import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { getTasks, createTask, updateTask, deleteTask } from "../../api/taskService";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../../api/eventService";

function Dashboard({ darkMode, toggleTheme }) {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setTasks(await getTasks());
        setEvents(await getEvents());
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    }
    fetchData();

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Add Task
  const handleAddTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      const newTask = await createTask({
        name: newTaskName,
        description: newTaskDesc,
        time: newTaskTime,
      });
      setTasks([...tasks, newTask]);
      setNewTaskName(""); setNewTaskDesc(""); setNewTaskTime("");
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  // Update Task Status
  const handleUpdateTask = async (id, status) => {
    try {
      const updatedTask = await updateTask(id, { status });
      setTasks(tasks.map(t => t._id === id ? updatedTask : t));
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  // Add Event
  const handleAddEvent = async () => {
    if (!newEventName.trim() || !newEventDate) return;
    try {
      const newEvent = await createEvent({ name: newEventName, date: newEventDate });
      setEvents([...events, newEvent]);
      setNewEventName(""); setNewEventDate("");
    } catch (err) {
      console.error("Error adding event:", err.message);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err.message);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Productivity score
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const productivityScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Nityo Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Theme Toggle */}
      <div className="dashboard-card">
        <div className="emoji">🌙☀️</div>
        <button className="action-btn" onClick={toggleTheme}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Tasks */}
      <div className="dashboard-card">
        <div className="emoji">✏️</div>
        <h3>Tasks</h3>
        <input type="text" placeholder="Task Name" value={newTaskName} onChange={(e)=>setNewTaskName(e.target.value)} />
        <input type="text" placeholder="Task Description" value={newTaskDesc} onChange={(e)=>setNewTaskDesc(e.target.value)} />
        <input type="datetime-local" value={newTaskTime} onChange={(e)=>setNewTaskTime(e.target.value)} />
        <button className="action-btn" onClick={handleAddTask}>Add Task</button>

        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <span><strong>{task.name}</strong> — {task.description} ({task.status})</span>
            <select value={task.status} onChange={(e)=>handleUpdateTask(task._id, e.target.value)}>
              <option>Pending</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>
            <button className="delete-btn" onClick={()=>handleDeleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Reports */}
      <div className="dashboard-card">
        <div className="emoji">📊</div>
        <h3>Reports</h3>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Productivity Score: {productivityScore}%</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${productivityScore}%` }}></div>
        </div>
      </div>

      {/* Events */}
      <div className="dashboard-card">
        <div className="emoji">📅</div>
        <h3>Events</h3>
        <input type="text" placeholder="Event Name" value={newEventName} onChange={(e)=>setNewEventName(e.target.value)} />
        <input type="datetime-local" value={newEventDate} onChange={(e)=>setNewEventDate(e.target.value)} />
        <button className="action-btn" onClick={handleAddEvent}>Add Event</button>

        {events.map(event => (
          <div key={event._id} className="event-item">
            <span><strong>{event.name}</strong> — {event.date}</span>
            <button className="delete-btn" onClick={()=>handleDeleteEvent(event._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="dashboard-card">
        <div className="emoji">📖</div>
        <h3>Instructions</h3>
        <ul>
          <li>Add tasks with name, description, and time.</li>
          <li>Track workflow (Pending / In‑Progress / Completed).</li>
          <li>Manage events with date and time.</li>
          <li>Get reminders and notifications before deadlines.</li>
          <li>View productivity reports with progress bar.</li>
          <li>Logout anytime from Dashboard top bar.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;