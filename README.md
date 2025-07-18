# 🧑‍💼 Employee Management System

A complete **Employee Management System** built with the MERN stack. The system supports **Admins** and **Employees**, with features like leave requests, salary management, department handling, and profile updates.

---

## 📁 Project Structure

.
├── backend
│ ├── Controllers # Express route handlers (logic)
│ ├── database # MongoDB connection setup
│ ├── Middlewares # JWT auth, error handling
│ ├── model # Mongoose schemas (User, Employee, Leave, etc.)
│ ├── public
│ │ └── uploads # File upload folder (e.g., profile images)
│ ├── Routes # Express route definitions
│ ├── .env # Environment variables
│ ├── index.js # Entry point for backend server
│ └── package.json
│
├── frontend
│ ├── public # Static assets
│ ├── src
│ │ ├── assets # Images, logos, etc.
│ │ ├── Components # Reusable UI components
│ │ ├── Context # React context for state management
│ │ ├── Pages # Route-based views (Dashboard, Login, etc.)
│ │ └── Utils # Helper functions & API calls
│ ├── App.jsx # Root component
│ ├── App.css
│ ├── index.css
│ └── package.json





---

## 🚀 Features

### Admin
- Add, update, and delete employees
- Manage departments
- Handle leave requests (approve/reject)
- View employee details and salaries

### Employee
- Submit and track leave requests
- View salary info and profile
- Update personal details

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS / Bootstrap, Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Others:** Multer for file uploads, Dotenv for config, Context API for state

---

## ⚙️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```
### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside backend/:
```bash 
PORT=5000
MONGO_URI=mongodb://localhost:27017/employeedb
JWT_SECRET=your_jwt_secret
```
Start backend server:
```bash 
npm run dev
```

## 📡 API Routes

### 🔐 Auth Routes
| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/api/auth/login`    | Login for Admin/Employee  |
| POST   | `/api/auth/register` | Register a new employee   |

---

### 👨‍💼 Admin Routes
| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| GET    | `/api/employees`                 | Get all employees                  |
| GET    | `/api/employees/:id`             | Get single employee by ID          |
| POST   | `/api/employees`                 | Add new employee                   |
| PUT    | `/api/employees/:id`             | Update employee                    |
| DELETE | `/api/employees/:id`             | Delete employee                    |
| GET    | `/api/departments`               | Get all departments                |
| POST   | `/api/departments`               | Add new department                 |
| PUT    | `/api/departments/:id`           | Update department                  |
| DELETE | `/api/departments/:id`           | Delete department                  |
| PUT    | `/api/leaves/:id/status`         | Approve or reject leave request    |
| GET    | `/api/salaries/employee/:id`     | Get salaries by employeeId         |
| POST   | `/api/salaries`                  | Add or update employee salary      |

---

### 👷 Employee Routes
| Method | Endpoint                        | Description                        |
|--------|---------------------------------|------------------------------------|
| GET    | `/api/profile`                  | Get logged-in employee profile     |
| PUT    | `/api/profile/update`           | Update personal profile            |
| POST   | `/api/leaves`                   | Submit new leave request           |
| GET    | `/api/leaves`                   | View my leave requests             |

---

### 🛠 Other Routes (Optional)
| Method | Endpoint                         | Description                     |
|--------|----------------------------------|---------------------------------|
| POST   | `/api/settings/change-password`  | Change account password         |
| GET    | `/api/dashboard/stats`           | Admin dashboard data (optional) |


### 3. Frontend Setup
```bash 
cd ../frontend
npm install
npm run dev
```

## 📋 Summary

This is a full-stack Employee Management System designed for organizations to manage employees, departments, salaries, and leave requests.

The system supports:
- **Admins**, who can manage all employee-related data
- **Employees**, who can view and manage their own profiles and leave requests

It is built using the **MERN stack** (MongoDB, Express, React, Node.js) and follows a clean role-based access control system.

