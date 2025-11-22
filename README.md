# Task Manager – Full Stack Assignment (PERN Stack)

A full-stack task management dashboard with authentication, pagination, sorting, and priority management.

**Author:** Prasanna Koirala  
**Email:** prasanna2koirala@gmail.com

**Tech Stack:**  
PostgreSQL • Express • Prisma • Node.js • React • Redux • TailwindCSS

---

## 🔗 Live Demo

- **Frontend (Vercel):** https://task-manager-pern-f5upc2dn2-furs-projects-8bede4b9.vercel.app/
- **Backend API (Render):** https://task-manager-pern.onrender.com

> You can sign up with a new account and start creating tasks right away.

---

## 🖼 Preview

<img width="1512" height="836" alt="image" src="https://github.com/user-attachments/assets/af180373-312f-4ed9-84b9-e77749771358" />


---

## 🚀 Project Overview

This is a fully functional **PERN (PostgreSQL + Express + React + Node)** task management application built as part of a Full Stack Developer Assignment.

It includes:

- ✅ **JWT authentication** (register + login)
- ✅ **Secure password hashing** with bcrypt
- ✅ **Protected task routes** using auth middleware
- ✅ **CRUD operations** for tasks
- ✅ **Server-side pagination**
- ✅ **Sorting by due date & priority**
- ✅ **Overdue task highlighting** on the UI
- ✅ **Priority enum** using PostgreSQL + Prisma
- ✅ **Responsive UI** with TailwindCSS
- ✅ **Global state management** with Redux

---

## 🧩 Features in Detail

### 1. Authentication

- **Register** with `name`, `email`, `password`.
- **Login** with email & password.
- On successful login/register:
  - A **JWT token** is issued by the backend.
  - The token is **stored in `localStorage`** on the frontend.
  - Every API request attaches `Authorization: Bearer <token>` using an Axios interceptor.
- **Auth middleware** (`auth.js`) verifies the token and injects `req.user` for all protected routes.

> **Why localStorage?**  
> For this assignment, localStorage keeps the implementation simple and makes it easy to demo. In a production setting, HTTP-only cookies would be preferred to reduce XSS attack surface.

---

### 2. Task Management

Each task belongs to a single user and has:

- `title`
- `description`
- `priority` (**low**, **medium**, **high**) – stored as a **PostgreSQL enum** via Prisma
- `endDate` (due date)
- `createdAt`, `updatedAt`

Users can:

- ➕ Create tasks
- ✏️ Edit tasks
- 🗑 Delete tasks
- 👀 View **only their own** tasks

**Overdue tasks** (due date in the past) are visually highlighted on the UI.

---

### 3. Pagination & Sorting (Server-Side)

The backend `/api/tasks` endpoint supports:

- `page` – page number (default: `1`)
- `pageSize` – items per page (default: `10`)
- `sortBy` – one of:
  - `endDate`
  - `priority`
  - `createdAt`
- `sortOrder` – `asc` or `desc` (default: `asc`)

The response includes:

```json
{
  "status": true,
  "tasks": [ ... ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 12,
    "totalPages": 2
  }
}
```
