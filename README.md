# 🗂️ Task Manager (PERN Stack)

A full-stack **Task Manager Dashboard** built using **PERN** (PostgreSQL, Express, React, Node.js) with authentication, task CRUD, pagination, sorting, and a clean responsive UI.

---

## 🚀 Live Demo

### **Frontend (Vercel)**

🔗 [https://task-manager-pern.vercel.app/](https://task-manager-pern.vercel.app/)

### **Backend API (Render)**

🔗 [https://task-manager-pern.onrender.com](https://task-manager-pern.onrender.com)

---

## 📸 Application Preview

<img width="1512" height="834" alt="image" src="https://github.com/user-attachments/assets/65512a3a-2811-48d0-997e-df6ab2e5b95d" />


---

## ✨ Features

### 🔐 Authentication

- JWT-based login & signup
- Password hashing using bcrypt
- Token stored in **localStorage** (assignment-friendly)
- Auth middleware protects all task routes

### 📝 Task Management

- Create, read, update, delete tasks
- Priority levels (low, medium, high)
- End date selection
- Detects & visually marks overdue tasks

### 🔎 Sorting & Pagination

- Sort tasks by **due date**, **created date**, or **priority**
- Ascending / descending order
- Server-side pagination for scalability

### 🖥️ Frontend

- React 18 + Redux
- TailwindCSS
- Responsive UI
- Toast notifications
- Auto redirect on login/signup

### 🛠️ Backend

- Node.js + Express
- Prisma + PostgreSQL
- Input validation with express-validator
- Modular routes & controllers

---

## 🧰 Tech Stack

**Frontend:** React, Redux, TailwindCSS, Axios

**Backend:** Node.js, Express.js, Prisma, JWT, bcrypt

**Database:** PostgreSQL (Prisma Data Platform)

**Deployment:** Vercel (frontend), Render (backend)

---

## 🔌 API Endpoints

### **Auth Routes**

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| POST   | /api/register | Register user      |
| POST   | /api/login    | Login & return JWT |

### **Task Routes (Protected)**

| Method | Endpoint       | Description                             |
| ------ | -------------- | --------------------------------------- |
| GET    | /api/tasks     | Fetch tasks (with sorting + pagination) |
| GET    | /api/tasks/:id | Fetch single task                       |
| POST   | /api/tasks     | Create task                             |
| PATCH  | /api/tasks/:id | Update task                             |
| DELETE | /api/tasks/:id | Delete task                             |

---

## ⚙️ Environment Variables

### **Backend (.env)**

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
PORT=8000
```

### **Frontend (.env)**

```
REACT_APP_API_BASE_URL=https://task-manager-pern.onrender.com/api
```

---

## 🏗️ Running Locally

### 1. Clone the repository

```
git clone https://github.com/prasannakoirala58/Task-Manager-PERN.git
cd Task-Manager-PERN
```

### 2. Install dependencies (root + frontend + backend)

```
npm run install-all
```

If you get an error about `concurrently`, install it globally:

```
npm install -g concurrently
```

### 3. Start both frontend and backend together

```
npm run dev
```

➡ Backend → [http://localhost:8000](http://localhost:8000)

➡ Frontend → [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deployment

### **Backend (Render)**

**Build command:**

```
npm install && npx prisma generate && npx prisma db push
```

**Start command:**

```
node app.js
```

### **Frontend (Vercel)**

- Framework: Create React App
- **Build command:**

```
npm run build
```

- **Output directory:**

```
build
```

---

## 🔐 Why LocalStorage?

For this assignment:

- Simpler than HTTP-only cookies across two different domains (Render + Vercel)
- Works easily with Authorization headers
- Good for demo / portfolio projects

For production → prefer **HTTP-only cookies**.

---

## 🧑‍💻 Author

**Prasanna Koirala**
📧 [prasanna2koirala@gmail.com](mailto:prasanna2koirala@gmail.com)

---

## ⭐ Final Notes

This project demonstrates:

- Clean PERN architecture
- JWT auth & protected routes
- Prisma ORM mastery
- Pagination + sorting logic
- React + Redux state management
- Fully deployed full-stack workflow

Feel free to ⭐ star the repo or reach out for collaborations!
