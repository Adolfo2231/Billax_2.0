# Billax Frontend

React + TypeScript web application for Billax

The frontend provides authentication and financial account management against the FastAPI backend.

---

## Tech Stack

- React 19
- TypeScript
- Vite 8
- React Router v7
- Tailwind CSS v4

---

## Current Status

The frontend covers authentication and account management for the current backend V0.

### Implemented

- User registration
- Login with JWT access tokens
- Session restore via `GET /api/v1/auth/me`
- Protected and public-only routes
- Dashboard greeting, net worth, and active accounts
- Account list
- Account creation
- Account update
- Account deactivation
- Desktop sidebar and mobile navigation
- Centralized `apiClient` with typed API errors
- Design tokens and shared UI primitives
- Frontend deployed to Render

### Next

- Category UI
- Transaction UI

---

## Architecture

The frontend follows a layered structure so pages stay thin and API access stays in one place.

```text
Page / Route
     │
     ▼
Hooks
     │
     ▼
Services / apiClient
     │
     ▼
FastAPI backend
```

### Application Structure

```text
frontend/
├── .env.example
└── src/
    ├── pages/                   # Route-level screens
    ├── routes/                  # Router, session guards
    ├── hooks/                   # Session and feature hooks
    ├── services/                # API client, auth, accounts
    ├── components/
    │   ├── accounts/
    │   ├── auth/
    │   ├── dashboard/
    │   ├── layout/
    │   └── ui/
    ├── types/                   # Public TypeScript contracts
    ├── utils/                   # Formatting and validation
    ├── styles/                  # Design tokens
    ├── App.tsx
    └── main.tsx
```

Pages orchestrate UI. Hooks own loading, error, and submit state. Services talk to the backend.

---

## Authentication

Authentication uses the backend OAuth2 login and stores the JWT in `localStorage`.

```text
Register / Login
        │
        ▼
JWT stored in localStorage
        │
        ▼
AuthProvider loads GET /api/v1/auth/me
        │
        ▼
Protected routes
```

A 401 from a protected request clears the session and sends the user back to login.

---

## Routes

| Path | Access | Screen |
|---|---|---|
| `/login` | Public only | Login |
| `/register` | Public only | Registration |
| `/dashboard` | Authenticated | Dashboard |
| `/accounts` | Authenticated | Account list |
| `/accounts/new` | Authenticated | Create account |
| `/accounts/:id/edit` | Authenticated | Edit / deactivate account |

Signed-in users are kept off `/login` and `/register`. Unauthenticated users are redirected to `/login`.

---

## Environment Configuration

Create the local environment file:

```bash
cp .env.example .env
```

Example:

```env
VITE_API_URL=http://localhost:8000
```

`VITE_API_URL` is required. Vite only exposes variables prefixed with `VITE_` to the browser.

Do not commit real secrets to the repository.

---

## Local Development

The backend must be running on the URL configured in `VITE_API_URL`.

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The Vite development server:

```text
http://localhost:5173
```

Other scripts:

```bash
npm run lint
npm run build
npm run preview
```

---

## Production Deployment

The frontend is deployed to Render:

```text
https://billax-frontend.onrender.com
```

Unauthenticated visitors land on login:

```text
https://billax-frontend.onrender.com/login
```

The production build uses `VITE_API_URL` at build time to point the `apiClient` at the backend.

---

## Related Documentation

For the backend API, ownership rules, and production deployment, see the repository root [`README.md`](../README.md) and [`backend/README.md`](../backend/README.md).
