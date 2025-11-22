# Task Manager – Full Stack Assignment (PERN Stack)

A full-stack task management dashboard with authentication, pagination, sorting, and priority management.

**Author:** Prasanna Koirala
**Email:** [prasanna2koirala@gmail.com](mailto:prasanna2koirala@gmail.com)
**Tech Stack:** React • Redux • TailwindCSS • Node.js • Express • Prisma • PostgreSQL

---

## 📸 Preview

![Preview-Image](image.png)

---

## 🚀 Project Overview

This is a fully functional **PERN (PostgreSQL + Express + React + Node)** task management application built as part of the Full Stack Developer Assignment.

It includes:

- **JWT authentication**
- **CRUD operations** for tasks
- **Server-side pagination**
- **Sorting** by due date & priority
- **Overdue task highlighting**
- **Priority enum using PostgreSQL**
- Prisma ORM + PostgreSQL
- Responsive UI (TailwindCSS)
- Global state via Redux
- Deployment-ready (Render + Vercel)

---

## ✨ Features

### 🔐 User Authentication

- JWT login & signup
- Password hashing using bcrypt
- Token stored in `localStorage` for simplicity
- Protected API routes

### 📋 Task Management

- Create, view, update, delete tasks
- Priority (Low / Medium / High)
- End date with overdue detection
- Sort by:

  - Due date (asc/desc)
  - Priority
  - Created date

- Server-side pagination

### 🎨 Frontend

- Login & Signup pages
- Dashboard with:

  - Paginated task list
  - Sorting dropdown
  - Add/Edit/Delete actions

- Responsive UI
- Redux for global state

### 🗄 Database (PostgreSQL)

- `users` and `tasks` tables
- Priority stored as PostgreSQL enum via Prisma

---

## 📁 Project Structure

```
/backend
  app.js
  prisma/schema.prisma
  controllers/
  routes/
  middlewares/
  package.json
/frontend
  src/
    components/
    redux/
    api/
    hooks/
    pages/
  package.json
package.json (root)
```

---

## 🧪 API Endpoints

### Auth

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/api/register` | Register a new user |
| POST   | `/api/login`    | Login user          |

### Tasks

| Method | Endpoint                                        | Description   |
| ------ | ----------------------------------------------- | ------------- |
| GET    | `/api/tasks?page=&pageSize=&sortBy=&sortOrder=` | Fetch tasks   |
| POST   | `/api/tasks`                                    | Create a task |
| PATCH  | `/api/tasks/:id`                                | Update a task |
| DELETE | `/api/tasks/:id`                                | Delete a task |

---

## 🧰 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-task-manager.git
cd mern-task-manager
```

### 2. Install all dependencies

```bash
npm run install-all
```

### 3. Environment variables

Create `/backend/.env`:

```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
```

### 4. Start the project

```bash
npm run dev
```

Runs backend on **8000** and frontend on **3000** using concurrently.

---

## 🛠 Prisma Commands

Run migrations:

```bash
cd backend
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## ☁️ Deployment

### Backend → Render

Build command:

```bash
npm install && npx prisma generate && npx prisma db push
```

Start command:

```bash
npm start
```

### Frontend → Vercel

Add env:

```
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
```

---

## 📽 Demo Video (Optional)

Include a screen recording if deployment isn't provided.

---

## ✔ Submission Checklist

- [x] Full source code
- [x] JWT Auth
- [x] CRUD tasks
- [x] Pagination
- [x] Sorting
- [x] README
- [ ] Deployment links (optional)
- [ ] Demo video (optional)

---

## 👤 Author

**Prasanna Koirala**
📧 [prasanna2koirala@gmail.com](mailto:prasanna2koirala@gmail.com)
