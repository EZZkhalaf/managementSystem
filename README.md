🧑‍💼 Employee Management System
A modern web-based Employee Management System with role-based access for Admins and Employees. This application helps organizations manage employee records, salaries, departments, and leave requests efficiently.

🚀 Features
🔐 Authentication
JWT-based secure login

Role-based access (Admin & Employee)

👨‍💼 Admin Panel
Manage employees: Add, edit, delete

Manage departments

View and approve/reject leave requests

Assign and update employee salaries

Access detailed employee information

👷 Employee Panel
View personal profile and salary details

Submit leave requests

View leave history and approval status

Edit personal information

🛠️ Tech Stack
Backend
Node.js + Express.js – RESTful API

MongoDB with Mongoose – Database

JWT – Authentication

Multer – File uploads (e.g., profile pictures or documents)

Frontend
React.js – Frontend framework

React Router – Client-side routing

Tailwind CSS / Bootstrap – UI styling

React Toastify – Notifications

📁 Project Structure
bash
Copy
Edit
/client         # React frontend
/index.js
/server         # Node.js backend
├── models      # Mongoose schemas
├── routes      # Express API routes
├── controllers # API logic
├── middleware  # Auth and error handling
⚙️ Setup Guide
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
2. Install dependencies
Backend
bash
Copy
Edit
cd server
npm install
Frontend
bash
Copy
Edit
cd ../client
npm install
3. Set up environment variables
Create a .env file inside /server:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_management
JWT_SECRET=your_jwt_secret
4. Run the application
Start Backend
bash
Copy
Edit
cd server
npm run dev
Start Frontend
bash
Copy
Edit
cd ../client
npm start
Visit: http://localhost:3000

🧪 Sample Credentials
bash
Copy
Edit
Admin Email: admin@example.com
Admin Password: admin123
You can create this user manually via MongoDB Compass or implement a seeding script.

✨ To-Do / Improvements
PDF export for payslips or reports

Email notifications for leave status

Upload employee documents (contracts, ID, etc.)

Activity logging / audit trail

Mobile responsiveness enhancements

📄 License
This project is licensed under the MIT License.

