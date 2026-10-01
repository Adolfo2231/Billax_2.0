# Billax 2.0

[![Backend CI](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml/badge.svg?branch=dev)](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml)

Billax 2.0 is a personal finance application designed to help users manage their financial accounts, categories and transactions through a secure backend API and web application.

The project is being developed as a monorepo with a **FastAPI backend**, **PostgreSQL database**, and **React + TypeScript frontend**.

The current development milestone focuses on building a production-ready backend foundation before expanding the frontend.

---

## Project Status

**Current milestone: Backend v0 deployed and production-verified.**

### Completed

- User registration with password hashing
- OAuth2 password authentication
- JWT access tokens
- Authenticated user endpoint
- Inactive-user validation
- Account CRUD operations
- Account ownership enforcement
- Account deactivation without deleting financial history
- Category and Transaction SQLAlchemy models
- PostgreSQL database
- Alembic migrations
- Docker development environment
- Production Docker configuration
- Production PostgreSQL configuration
- FastAPI backend deployed to Render
- Production verification
- Automated formatting and linting
- Automated migration checks
- Automated backend tests
- GitHub Actions CI
- **67 passing backend tests**

### In progress

- Category schemas
- Category CRUD
- Transaction schemas and CRUD
- Frontend authentication UI
- Frontend API integration
- Dashboard

---

## Tech Stack

### Backend

- Python 3.12
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- JWT / OAuth2
- pytest
- Ruff

### Frontend

- React
- TypeScript
- Vite

### Infrastructure & Development

- Docker
- Docker Compose
- GitHub Actions
- Render
- PostgreSQL hosting

---

## Architecture

Billax follows a layered backend architecture designed to separate HTTP handling, business logic and database access.

```text
Client
  │
  ▼
API / Endpoints
  │
  ▼
Services
  │
  ▼
Repositories
  │
  ▼
SQLAlchemy Models
  │
  ▼
PostgreSQL
```

### Backend structure

```text
backend/
├── alembic/                 # Database migrations
├── app/
│   ├── api/                 # API routes and dependencies
│   ├── service/             # Business logic
│   ├── repositories/        # Database access
│   ├── models/              # SQLAlchemy models
│   ├── schema/              # Pydantic schemas
│   ├── core/                # Security, JWT and application concerns
│   ├── config/              # Application settings
│   ├── database/            # Database engine and sessions
│   ├── test/                # Backend tests
│   └── main.py              # FastAPI application
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## Repository Structure

```text
Billax_2.0/
├── backend/                 # FastAPI backend
├── frontend/                # React + TypeScript frontend
├── .github/
│   └── workflows/           # GitHub Actions CI
├── docker-compose.yml       # Local development environment
└── README.md
```

---

## Authentication

The backend uses OAuth2-compatible authentication with JWT access tokens.

Current authentication flow:

```text
Register
   │
   ▼
Password hashing
   │
   ▼
Login
   │
   ▼
JWT access token
   │
   ▼
Authenticated endpoints
```

Protected operations use the authenticated user's identity to enforce ownership.

---

## Accounts

Account management is currently the most complete financial domain in the backend.

Implemented operations include:

- Create account
- List authenticated user's accounts
- Retrieve account details
- Update account
- Deactivate account
- Ownership validation

Accounts are associated with the authenticated user, preventing users from operating on another user's financial data.

Deactivation uses a soft-delete approach so financial history is preserved.

---

## Database

Billax uses PostgreSQL with SQLAlchemy for ORM-based database access and Alembic for schema migrations.

Current financial models include:

```text
User
 │
 ├── Account
 │
 ├── Category
 │
 └── Transaction
```

Database schema changes are managed through Alembic migrations.

---

## API Documentation

When running the backend locally, FastAPI provides interactive API documentation:

```text
Swagger UI
http://127.0.0.1:8000/docs

OpenAPI
http://127.0.0.1:8000/openapi.json
```

---

## Running Locally

### Requirements

- Python 3.12
- Docker Desktop
- Docker Compose
- PostgreSQL

### Using Docker

From the project root:

```bash
docker compose up --build -d
```

Check running services:

```bash
docker compose ps
```

Verify the API:

```bash
curl http://127.0.0.1:8000/
```

Stop the environment:

```bash
docker compose down
```

To also remove the local PostgreSQL volume:

```bash
docker compose down -v
```

> Removing the volume deletes the local database data.

---

## Local Backend Development

```bash
cd backend

python3.12 -m venv venv
source venv/bin/activate

python -m pip install -r requirements.txt
cp .env.example .env
```

Configure the required environment variables in `.env`.

Apply database migrations:

```bash
python -m alembic upgrade head
```

Start the development server:

```bash
python -m uvicorn app.main:app --reload
```

---

## Testing

Run backend tests from `backend/`:

```bash
python -m pytest -q
```

Current test status:

```text
67 passed
```

Additional quality checks:

```bash
python -m ruff format --check .
python -m ruff check .
```

---

## Continuous Integration

GitHub Actions automatically validates the backend.

The CI pipeline currently performs:

1. Install dependencies
2. Check formatting
3. Run Ruff linting
4. Start PostgreSQL
5. Run Alembic migrations
6. Verify migration consistency
7. Run the complete pytest suite

Current CI result:

```text
67 passed
```

---

## Production Deployment

The FastAPI backend has been deployed to **Render**.

The production environment includes:

- Production Docker configuration
- Environment-based configuration
- Production PostgreSQL
- Alembic migrations
- FastAPI application server
- Health endpoint
- Production verification

The deployment configuration is designed to use the runtime port provided by the hosting platform.

---

## Current Development Roadmap

```text
Authentication
      │
      ▼
Accounts CRUD
      │
      ▼
Ownership & Tests
      │
      ▼
Category Model
      │
      ▼
Transaction Model
      │
      ▼
Backend Deployment
      │
      ▼
Production Verification
      │
      ├──────────────► Category Schemas
      │
      ▼
Category CRUD
      │
      ▼
Transaction CRUD
      │
      ▼
Frontend Authentication
      │
      ▼
Frontend API Integration
      │
      ▼
Financial Dashboard
```

---

## Project Goals

Billax 2.0 is being built as a practical backend-focused portfolio project demonstrating:

- Clean backend architecture
- REST API development
- Authentication and authorization
- Database design
- ORM usage
- Database migrations
- Automated testing
- CI/CD practices
- Dockerized development
- Production deployment
- Frontend/backend integration

The goal is to build the application incrementally while maintaining production-oriented engineering practices throughout development.