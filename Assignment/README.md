# MERN Stack Internship Assignment

## 📌 Overview
This project is built as part of the **MERN Stack Intern Assignment** for **SOL9X | AVTECHFIN**.  
It demonstrates **Authentication**, **Role-based Access**, and **Dashboard CRUD** using the MERN stack.

---

## ✨ Features
- 🔑 **Authentication**
  - Signup & Login with **JWT Authentication**
  - Passwords hashed with **bcrypt**
  - Email verification (optional/bonus)
  - Forgot & Reset password flow (bonus)

- 👥 **User Roles**
  - **Admin**
    - View all students
    - Add / Edit / Delete student records
  - **Student**
    - View own profile
    - Update profile (name, email, course)

- 📊 **Dashboards**
  - Admin Dashboard (manage students)
  - Student Dashboard (manage profile)
  - Role-based redirection after login

- 🛡️ **Security**
  - Protected Routes (frontend & backend)
  - JWT stored in localStorage
  - Role-based API access

- 🎨 **Frontend**
  - React + Context API
  - Tailwind CSS for styling
  - Axios for API communication
  - React Router v6 for navigation

- ⚙️ **Backend**
  - Node.js + Express
  - MongoDB (via Mongoose)
  - JWT + bcrypt for authentication
  - Nodemailer for email (optional)

---

## 🛠️ Tech Stack
- **Frontend:** React, Context API, React Router, Axios, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt, Nodemailer
- **Database:** MongoDB (local or Atlas)

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/mern-intern-assignment.git
cd mern-intern-assignment

##Setup Backend

cd backend
npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_intern
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

## run backend

npm start

## Setup Frontend

cd frontend
npm install
npm run dev

