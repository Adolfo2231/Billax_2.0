# Billax 2.0 Backend

[![Backend CI](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml/badge.svg?branch=dev)](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml)

FastAPI backend for Billax 2.0, a personal finance application.

The backend provides authentication, user management and financial account operations backed by PostgreSQL.

---

## Tech Stack

- Python 3.12
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- JWT / OAuth2
- pytest
- Ruff
- Docker
- GitHub Actions

---

## Current Status

The backend has reached its first production milestone.

### Implemented

- User registration
- Password hashing
- OAuth2 password authentication
- JWT access tokens
- Authenticated user endpoint
- Inactive-user validation
- Account CRUD
- Account ownership enforcement
- Account deactivation
- User, Account, Category and Transaction models
- PostgreSQL migrations
- Docker development environment
- Production Docker configuration
- Production database configuration
- Render deployment
- Production verification
- Automated formatting
- Automated linting
- Migration consistency checks
- Automated tests

### Test Suite

```text
67 passed
```

---

## Architecture

The backend follows a layered architecture:

```text
HTTP Request
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

### Application Structure

```text
backend/app/
├── api/
│   └── v1/
│       └── endpoints/       # HTTP endpoints
│
├── service/                 # Business logic
│
├── repositories/            # Database operations
│
├── models/                  # SQLAlchemy models
│
├── schema/                  # Pydantic schemas
│
├── core/                    # Security, JWT and shared backend logic
│
├── config/                  # Application configuration
│
├── database/                # Engine, sessions and dependencies
│
├── test/                    # pytest test suite
│
└── main.py                  # FastAPI application
```

---

## Authentication

Authentication uses OAuth2-compatible login with JWT access tokens.

```text
POST /api/v1/auth/register
        │
        ▼
Password hashing
        │
        ▼
POST /api/v1/auth/login
        │
        ▼
JWT access token
        │
        ▼
Protected endpoints
```

Protected endpoints obtain the current authenticated user and use that identity when performing user-owned operations.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT |
| `GET` | `/api/v1/auth/me` | Retrieve the authenticated user |

### Accounts

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/accounts/` | Create an account |
| `GET` | `/api/v1/accounts/` | List the authenticated user's accounts |
| `GET` | `/api/v1/accounts/{account_id}` | Retrieve account details |
| `PATCH` | `/api/v1/accounts/{account_id}` | Update an account |
| `PATCH` | `/api/v1/accounts/{account_id}/deactivate` | Deactivate an account |

---

## Account Ownership

Account operations are scoped to the authenticated user.

```text
current_user.id
      │
      ▼
Account ownership check
      │
      ├── Owner → operation allowed
      │
      └── Different user → operation rejected
```

This prevents authenticated users from modifying or accessing another user's financial accounts.

Account deactivation is implemented as a soft deactivation so historical financial data is not physically removed.

---

## Database

PostgreSQL is used as the primary relational database.

SQLAlchemy manages ORM models and database access.

Alembic manages schema migrations.

Current domain models:

```text
User
 │
 ├── Account
 │
 ├── Category
 │
 └── Transaction
```

Apply migrations:

```bash
python -m alembic upgrade head
```

Check migration consistency:

```bash
python -m alembic check
```

---

## Environment Configuration

Create the local environment file:

```bash
cp .env.example .env
```

Example:

```env
APP_NAME=Billax 2.0 API
APP_VERSION=0.1.0
ENVIRONMENT=development
DEBUG=true
DATABASE_URL=postgresql://user:password@127.0.0.1:5432/billax
TEST_DATABASE_URL=postgresql://user:password@127.0.0.1:5432/billax_test
FRONTEND_URL=http://localhost:5173
ACCESS_TOKEN_EXPIRE_MINUTES=30
SECRET_KEY=replace-with-a-local-secret-key
ALGORITHM=HS256
```

`TEST_DATABASE_URL` is only required to run pytest. Leave it unset in production. The other variables have no defaults, so the API does not start without them.

Do not commit real secrets to the repository.

---

## Local Development

Create a virtual environment:

```bash
python3.12 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Run migrations:

```bash
python -m alembic upgrade head
```

Start FastAPI:

```bash
python -m uvicorn app.main:app --reload
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Docker

From the project root:

```bash
docker compose up --build -d
```

Check containers:

```bash
docker compose ps
```

Stop containers:

```bash
docker compose down
```

Remove the local database volume:

```bash
docker compose down -v
```

---

## Testing

Run the complete test suite:

```bash
python -m pytest -q
```

Current result:

```text
67 passed
```

Run formatting checks:

```bash
python -m ruff format --check .
```

Run linting:

```bash
python -m ruff check .
```

---

## Continuous Integration

GitHub Actions validates the backend on pushes and pull requests targeting the main development branches.

The CI workflow performs:

```text
Install dependencies
        │
        ▼
Ruff formatting
        │
        ▼
Ruff linting
        │
        ▼
Start PostgreSQL
        │
        ▼
Run Alembic migrations
        │
        ▼
Check migration consistency
        │
        ▼
Run pytest
```

The current CI pipeline completes successfully with:

```text
67 passed
```

---

## Production Deployment

The backend is deployed to Render.

Production configuration includes:

- Docker-based deployment
- Environment variables for secrets and configuration
- PostgreSQL database
- Alembic migrations
- Runtime port configuration
- Health endpoint
- Production verification

The production deployment is separate from the local Docker development environment.

---

## Development Roadmap

### Completed

- Authentication
- User management
- Accounts CRUD
- Account ownership
- Account tests
- Category model
- Transaction model
- Docker development environment
- Production configuration
- Production database
- Backend deployment
- Production verification

### Next

1. Category schemas
2. Category CRUD
3. Transaction schemas
4. Transaction CRUD
5. Expanded financial validation
6. Frontend authentication
7. Frontend API integration
8. Financial dashboard

---

## Related Documentation

For the complete project overview, architecture and frontend roadmap, see the repository root [`README.md`](../README.md).