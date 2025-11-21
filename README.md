# Subscription Tracker API

A production-style Node.js + Express backend for tracking recurring subscriptions (Netflix, Spotify, Amazon Prime, etc.), with JWT authentication, MongoDB, automated renewal reminders via Upstash QStash Workflows, and email notifications powered by Nodemailer.

Built following the JavaScript Mastery **Backend Course + Production-Ready API (2025)**.

---

## Features

- **JWT Authentication**
  - User sign up / sign in / sign out
  - Password hashing with bcrypt
- **User Management**
  - Get all users
  - Get a single user (protected, owner-only)
- **Subscription Management**
  - Create a subscription for the authenticated user
  - Store price, currency, frequency, category, payment method, start date, renewal date, status
  - Auto-calculate `renewalDate` based on `startDate` + `frequency`
  - Automatically mark overdue subscriptions as `expired`
- **Automated Renewal Reminders**
  - Upstash QStash + `@upstash/workflow` to schedule jobs
  - Workflow sends reminders **7, 5, 2, and 1 day** before renewal
  - Email notifications via Nodemailer + Gmail App Password
- **Security & Observability**
  - Arcjet middleware for request protection / rate-limiting-style logic
  - Centralized error handling middleware
- **Config & DX**
  - Environment-based config with `dotenv`
  - Day.js for date handling
  - ESLint + nodemon for a smoother dev experience

---

## Tech Stack

- **Runtime & Framework**
  - Node.js
  - Express
- **Database**
  - MongoDB (Atlas)
  - Mongoose
- **Auth & Security**
  - JWT (`jsonwebtoken`)
  - bcryptjs
  - Arcjet (`@arcjet/node`, `@arcjet/inspect`)
- **Background Jobs & Workflows**
  - Upstash QStash
  - `@upstash/workflow`
- **Email**
  - Nodemailer
  - Gmail App Password
- **Utilities**
  - Day.js
  - dotenv
  - morgan
  - cookie-parser
- **Dev Tools**
  - nodemon
  - ESLint (`@eslint/js`, `globals`)


