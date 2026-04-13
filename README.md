# To-Do List App – MERN Stack

## 📌 Overview
A full-stack **MERN application** (MongoDB, Express.js, React, Node.js) that allows users to manage tasks with **CRUD functionality** and secure **JWT authentication**.  
Features include a responsive dashboard, calendar integration, and notifications.

---

## 🛠 Tech Stack
- **Frontend**: React (JavaScript/TypeScript), React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcrypt

---

## ✨ Features
- 🔐 **User Authentication** – Register/Login with JWT tokens
- ✅ **CRUD Operations** – Create, Read, Update, Delete tasks
- 📅 **Calendar Integration** – Manage events and deadlines
- 🔔 **Notifications** – Stay updated with reminders
- 📊 **Dashboard Overview** – Track productivity stats

---

## 📂 Project Structure
To-Do-List-App/
│
├── backend/                 # Node.js + Express server
│   ├── models/              # Mongoose schemas (User, Task, Event, etc.)
│   ├── routes/              # API endpoints (authRoutes, taskRoutes, eventRoutes)
│   ├── controllers/         # Business logic (authController, taskController, eventController)
│   ├── server.js            # Express app entry point
│   ├── .env                 # Environment variables (Mongo URI, JWT secret)
│   └── package.json         # Backend dependencies
│
├── frontend/                # React client
│   ├── src/
│   │   ├── api/             # API services
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components (Dashboard, Auth, etc.)        # React Context (Auth, Tasks)
│   │   ├── utils/           # Helper functions
│   │   ├── App.js           # Main app with routes
│   │   ├── index.js      
│   │   └── index.css        
│   ├── package.json        
│   └── package-lock.json         
│
├── README.md                # Documentation
└── .gitignore               # Ignore node_modules, env files, etc.

---

## ⚙️ Installation & Setup

1. **Clone the repo**
git clone https://github.com/Kanchan106/Nityo---ToDo-List-App.git
cd Nityo---ToDo-List-App

2. **Backend Setup**
cd backend
npm install
Create a .env file inside the backend/ folder with the following variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
npm run dev

3. **Frontend Setup**
cd ../frontend
npm install
npm run dev





