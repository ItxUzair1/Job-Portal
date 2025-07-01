
# 💼 Role-Based Job Portal

A full-stack job portal web application that allows **Job Seekers** and **Recruiters** to interact through a secure, feature-rich platform. Built with the MERN stack and JWT authentication for role-based access.

---

## 📌 Introduction

This Role-Based Job Portal enables users to register as either a **Job Seeker** or a **Recruiter**. The application offers dedicated features for each role:

* **Job Seekers** can search, bookmark, and apply to jobs.
* **Recruiters** can create job posts, view applicants, and manage applications.

---

## ✨ Features

### 👨‍💼 Job Seeker

* Register and log in
* Browse all job listings
* Search jobs by keyword
* Bookmark jobs
* Apply to jobs
* View application status (Accepted/Declined)

### 🧑‍💼 Recruiter

* Register and log in
* Post new job listings
* Delete jobs
* View who applied to each job
* Accept or Decline applications

### 🔐 General

* Role-based access using JWT
* Protected routes for each user type
* Responsive UI/UX

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Token (JWT)
* **Version Control:** Git & GitHub

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/job-portal.git

# 2. Navigate to the project folder
cd job-portal

# 3. Install dependencies
cd client && npm install     # for frontend
cd ../server && npm install  # for backend

# 4. Environment variables
# Create a .env file inside the /server directory and add:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

# 5. Run the app
# Backend
npm start

# Frontend (in another terminal)
cd ../client
npm run dev
```

---

## 📁 Folder Structure

```
job-portal/
│
├── client/           # React Frontend
│   └── src/
│       └── components/
│       └── pages/
│       └── utils/
│
├── server/           # Node.js Backend
│   └── models/
│   └── routes/
│   └── middleware/
│   └── controllers/
│
├── .env              # Environment variables
├── README.md
```

---

## 📡 API Endpoints

### 🔐 Auth Routes

* `POST /api/auth/register` - Register as Job Seeker or Recruiter
* `POST /api/auth/login` - Login and receive token

### 🧳 Job Routes

* `GET /api/jobs` - Get all jobs
* `POST /api/jobs` - Create job (Recruiter only)
* `DELETE /api/jobs/:id` - Delete job (Recruiter only)

### 📝 Application Routes

* `POST /api/apply/:jobId` - Apply to job (Job Seeker)
* `GET /api/applicants/:jobId` - View applicants (Recruiter)
* `POST /api/applications/:id/accept` - Accept application
* `POST /api/applications/:id/decline` - Decline application

---

## 🚀 Deployment

This application can be deployed on:

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Cyclic / Railway
* **Database:** MongoDB Atlas

---
## 📽️ Project Demo

Watch the full demo video of the Role-Based Job Portal:

👉 [Click here to watch on Loom](https://www.loom.com/share/a6b8b69b6be24df981da84e50d77ac77?sid=c3fde5a9-33d9-4ca9-b0fe-5d21396d245a)


## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to improve.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Developer:** Muhammad Uzair
**GitHub:** [@ItxUzair1](https://github.com/ItxUzair1)

