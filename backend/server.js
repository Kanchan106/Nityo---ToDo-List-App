const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // allow frontend
  credentials: true
}));

// Routes
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));