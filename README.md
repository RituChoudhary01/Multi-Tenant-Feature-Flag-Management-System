# Multi-Tenant Feature Flag Management System

A SaaS-style feature flag management platform — built for Byepo Technologies' SDE assignment. A Super Admin onboards organizations, each Organization Admin manages feature flags independently, and End Users check flag status in real time — with strict tenant isolation enforced at the database layer, not just the UI.

---

## Live demo

| Application | Link |
|---|---|
| Super Admin Portal | https://multi-tenant-feature-flag-managemen-one.vercel.app/ |
| Organization Admin Portal | https://multi-tenant-feature-flag-managemen-seven.vercel.app/ |
| End User Portal | https://multi-tenant-feature-flag-managemen-neon.vercel.app/ |

Super Admin test credentials:
Email: superadmin@byepo.com
Password: SuperAdmin@123

Note: the backend runs on Render's free tier and sleeps after periods of inactivity — the first request after idle time may take 30-50 seconds.

---

## Why this implementation

- Multi-tenancy enforced at the query level, not the UI. Every flag and user lookup is scoped by organization_id taken from the authenticated admin's JWT — one organization cannot read or modify another's data, even by guessing IDs in the URL.
- Three genuinely independent frontend applications, each its own deployable Vite project — not one app with role-based routing.
- Fully custom authentication. JWT + bcrypt, no Auth0/Firebase/Cognito, per the assignment's constraints.
- Layered backend architecture — routes never touch SQL, controllers never touch business logic, services never touch req/res. A centralized AppError / ApiResponse / handleError trio keeps every API response shape consistent.
- Production-grade database, not a local file — PostgreSQL on Neon, with foreign keys, composite unique constraints, and proper transactional inserts (RETURNING).

---

## Tech stack

Backend:
- Node.js + Express (ES Modules)
- PostgreSQL (Neon, serverless)
- JWT (jsonwebtoken) + bcryptjs for custom auth
- Layered architecture: routes → controllers → services

Frontend (three independent apps):
- React 18 + Vite
- Tailwind CSS
- react-hot-toast for notifications

Deployment:
- Backend → Render (Web Service)
- Frontends → Vercel (3 separate Static Site projects)

---

## Project structure

- Backend/
  - src/
    - config/db.js — PostgreSQL pool + schema bootstrap
    - middleware/auth.js — JWT verification, role guards
    - routes/ — auth, organization, and flag routes
    - controllers/ — HTTP request/response handling
    - services/ — business logic + SQL queries
    - utils/ — AppError, ApiResponse, handleError
    - app.js — entry point
- super-admin-frontend/
- admin-frontend/
- user-frontend/

---

## Database schema

organizations table: id (SERIAL PRIMARY KEY), name (TEXT UNIQUE NOT NULL), slug (TEXT UNIQUE NOT NULL), created_at (TIMESTAMP)

users table: id (SERIAL PRIMARY KEY), email (TEXT UNIQUE NOT NULL), password_hash (TEXT NOT NULL), role (TEXT, CHECK IN org_admin), organization_id (INTEGER REFERENCES organizations.id), created_at (TIMESTAMP)

feature_flags table: id (SERIAL PRIMARY KEY), key (TEXT NOT NULL), name (TEXT NOT NULL), enabled (INTEGER DEFAULT 0), organization_id (INTEGER REFERENCES organizations.id), created_at / updated_at (TIMESTAMP), UNIQUE constraint on (key, organization_id)

Super Admin is not a database row — it authenticates against static environment-variable credentials, since it's a bootstrapping role that must exist before any organization (and therefore any Org Admin) does.

---

## API reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/super-admin/login | Public | Super Admin login |
| POST | /api/auth/admin/signup | Public | Org Admin signup |
| POST | /api/auth/admin/login | Public | Org Admin login |
| GET | /api/organizations | Super Admin | List all organizations with admin/flag counts |
| POST | /api/organizations | Super Admin | Create an organization |
| GET | /api/organizations/public | Public | Org list for signup/user dropdowns |
| GET | /api/flags | Org Admin | List flags for own organization |
| POST | /api/flags | Org Admin | Create a feature flag |
| PUT | /api/flags/:id | Org Admin | Update / toggle a feature flag |
| DELETE | /api/flags/:id | Org Admin | Delete a feature flag |
| GET | /api/flags/check | Public | Check if a flag is enabled for an organization |

All responses follow a consistent envelope: success responses return success: true, message, and data; error responses return success: false, message, and details.

---

## Local setup

Backend:
1. cd Backend
2. npm install
3. Create a .env file with: DATABASE_URL, JWT_SECRET, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, PORT=4000
4. node src/app.js

Each frontend (run separately):
1. cd super-admin-frontend (or admin-frontend / user-frontend)
2. npm install
3. npm run dev
4. Optional: set VITE_API_URL in a .env file to point to your backend

---

## Author

Ritu Choudhary
