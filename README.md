# 🗂️ Task Manager (PERN Stack)

A full‑stack **Task Manager Dashboard** built using **PERN** (PostgreSQL, Express, React, Node.js) with authentication, task CRUD, pagination, sorting, and a clean responsive UI.

This project was built as part of a **Full‑Stack Developer Assignment** and follows industry‑standard best practices.

---

## 🚀 Live Demo

### **Frontend (Vercel)**

🔗 [https://task-manager-pern.vercel.app/](https://task-manager-pern.vercel.app/)

### **Backend API (Render)**

🔗 [https://task-manager-pern.onrender.com](https://task-manager-pern.onrender.com)

---

## 📸 Application Preview

![Task Manager Preview](./preview.png)

---

## ✨ Features

### 🔐 Authentication

- JWT‑based login & signup
- Password hashing using bcrypt
- Token stored in **localStorage** (assignment‑friendly; explained below)
- Protected routes using auth middleware

### 📝 Task Management

- Create, read, update, delete tasks
- Priority levels: **low, medium, high** (ENUM)
- End date selection
- Auto‑highlights overdue tasks

### 🔎 Sorting & Filtering

- Sort by **due date**, **created date**, or **priority**
- Ascending / descending order

### 📄 Pagination

- Server‑side pagination
- Adjustable page & pageSize (defaults: 1 & 10)

### 🖥️ Frontend

- Built with **React 18 + Redux**
- TailwindCSS for styling
- Responsive design
- Toast notifications
- Auto‑redirect on login/signup

### 🛠️ Backend

- Modular Express controllers & routes
- Input validation with express‑validator
- Prisma ORM with PostgreSQL
- Secure auth middleware

---

## 🧰 Tech Stack

**Frontend:** React, Redux, TailwindCSS, Axios, React‑Router
**Backend:** Node.js, Express.js, Prisma ORM, JWT, bcrypt
**Database:** PostgreSQL (Prisma Data Platform)
**Deployment:** Vercel (frontend), Render (backend)

---

## 🗄️ Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Priority {
  low
  medium
  high
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  tasks     Task[]
}

model Task {
  id          Int       @id @default(autoincrement())
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      Int
  title       String
  description String
  priority    Priority  @default(medium)
  endDate     DateTime
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

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
| GET    | /api/tasks     | Fetch user tasks (pagination + sorting) |
| GET    | /api/tasks/:id | Get single task                         |
| POST   | /api/tasks     | Create task                             |
| PATCH  | /api/tasks/:id | Update task                             |
| DELETE | /api/tasks/:id | Delete task                             |

---

## ⚙️ Environment Variables

### **Backend (.env)**

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
PORT=8000
```

### **Frontend (.env)**

```
REACT_APP_API_BASE_URL=https://task-manager-pern.onrender.com/api
```

---

## 🏗️ Running Locally

### 1. Clone the repo

```
git clone https://github.com/prasannakoirala58/Task-Manager-PERN.git
cd Task-Manager-PERN
```

### 2. Install all dependencies

```
npm run install-all
```

### 3. Start frontend + backend together

```
npm run dev
```

➡ Runs:

- Backend → [http://localhost:8000](http://localhost:8000)
- Frontend → [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deployment

### **Backend (Render)**

Build command:

```
npm install && npx prisma generate && npx prisma db push
```

Start command:

```
node app.js
```

### **Frontend (Vercel)**

- Framework: **Create React App**
- Build command:

```
npm run build
```

- Output folder:

```
build
```

---

## 🔐 Why LocalStorage Instead of Cookies?

For this assignment:

- You’re not handling banking‑level security.
- Render + Vercel separate domains make HTTP‑only cookies harder.
- LocalStorage works perfectly and keeps the assignment simple.
- Token is only used for Authorization headers.

If building a production app → HTTP‑only cookies are ideal.

---

## 🧑‍💻 Author

**Prasanna Koirala**
📧 [prasanna2koirala@gmail.com](mailto:prasanna2koirala@gmail.com)

---

## ⭐ Final Notes

This project demonstrates:

- Clean PERN infrastructure
- Authentication best practices
- Prisma ORM + PostgreSQL usage
- React + Redux state management
- Sorting, pagination, filtering logic
- Beautiful UI + fully deployed full‑stack app

If this helped or impressed you — ⭐ star the repo!
