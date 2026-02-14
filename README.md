# 🗳️ Student Voting System

A modern **Full-Stack Student Voting Web Application** where students can securely cast their vote and admins can manage nominees and view live results.

Built using **React JS + Tailwind CSS + Node.js + MongoDB**, this project ensures **secure login, one-vote restriction, and role-based dashboards.**

---

## 📌 About
**Student Voting System** is designed to provide a secure and transparent digital voting platform for colleges/schools.  
Students can log in, view nominees, and cast their vote only once, while admins can manage candidates and monitor results through a dedicated dashboard.

---

## 🌐 Live Demo 🔗
https://election01.vercel.app/

---

## 🌟 Key Highlights
- 🔐 JWT Secure Authentication  
- 👨‍🎓 Student & 👨‍💼 Admin Roles  
- 🗳️ One Student = One Vote  
- 📊 Admin Result Dashboard  
- ⚡ Fast UI with Vite  
- 📱 Responsive Design using Tailwind CSS  

---

## 🚀 Tech Stack

### Frontend
- React JS  
- Tailwind CSS  
- Vite  
- React Router DOM  
- Context API  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- BcryptJS  
- dotenv  

---

## 📂 Project Structure

```
student-voting-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Nominee.js
│   │   └── Vote.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── nominees.js
│   │   └── votes.js
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminNomineeForm.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Greeting.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NominationForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── VotingForm.jsx
│   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │
│   │   ├── services/
│   │   │   └── api.js
│   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### 👨‍🎓 Student
- Signup / Login  
- View Nominees  
- Vote Only Once  
- Student Dashboard  

### 👨‍💼 Admin
- Admin Login  
- Add / Delete Nominees  
- View Voting Results  
- Manage Users  

---

## 🔐 Security
- JWT Token Authentication  
- Password Hashing (Bcrypt)  
- Protected Routes  
- Role-Based Access  
- Single Vote Restriction  

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/nikhilranjan01/election.git
cd student-voting-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run Backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Working Flow
1. Student creates account  
2. Admin adds nominees  
3. Student logs in and votes  
4. Vote stored securely in MongoDB  
5. Admin views results in dashboard  

---

## 📦 Major Dependencies

### Frontend
- react
- react-router-dom
- axios
- tailwindcss

### Backend
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv

---

## 🔮 Future Improvements
- Email / OTP Verification  
- Live Result Charts  
- Multi-Election Support  
- Dark Mode  
- Export Results (PDF/Excel)  

---

## 👨‍💻 Author
**Nikhil Ranjan**

---

## 📜 License
This project is for **Learning & Educational Purposes Only**.
