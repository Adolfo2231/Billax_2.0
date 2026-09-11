# Billax 2.0

[![Backend CI](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml/badge.svg?branch=dev)](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml)

Personal finance backend built with FastAPI and PostgreSQL.

Billax 2.0 demonstrates layered backend architecture, JWT authentication, relational data modeling, database migrations, automated testing and continuous integration.

## Tech stack

Python 3.12 · FastAPI · SQLAlchemy · PostgreSQL · Alembic · Pydantic · JWT/OAuth2 · pytest · Ruff · Docker · GitHub Actions

## Implemented

- User registration with password hashing.
- OAuth2 login with JWT access tokens.
- Protected current-user endpoint.
- Inactive-user validation.
- User, Account, Category and Transaction models.
- PostgreSQL migrations with Alembic.
- Dockerized FastAPI and PostgreSQL environment.
- Automated backend quality checks and tests.
- Pydantic schemas for authentication, users and accounts.
- Authenticated account creation with user ownership.
- 32 passing tests.

## Architecture

```text
backend/app/
├── api/            # Endpoints and HTTP dependencies
├── service/        # Business logic
├── repositories/   # Database access
├── models/         # SQLAlchemy models
├── schema/         # Pydantic request/response schemas
├── core/           # Security, JWT and exceptions
├── config/         # Environment settings
├── database/       # Engine, sessions and dependencies
└── test/           # Backend tests
```

Request flow:

```text
HTTP request → API → Service → Repository → PostgreSQL
```

## Run with Docker

Requirements:

- Docker Desktop
- Docker Compose

From the project root:

```bash
docker compose up --build -d
```

Verify the services:

```bash
docker compose ps
curl http://127.0.0.1:8000/
```

Open:

- Swagger UI: http://127.0.0.1:8000/docs
- OpenAPI: http://127.0.0.1:8000/openapi.json

Stop the environment:

```bash
docker compose down
```

> Running `docker compose down -v` also deletes the local PostgreSQL data.

## Local backend setup

```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
```

Configure both PostgreSQL databases in `.env`:

```env
DATABASE_URL=postgresql://user:password@127.0.0.1:5432/billax
TEST_DATABASE_URL=postgresql://user:password@127.0.0.1:5432/billax_test
SECRET_KEY=replace-with-a-local-secret-key
```

Apply migrations and start the API:

```bash
python -m alembic upgrade head
python -m uvicorn app.main:app --reload
```

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a user |
| `POST` | `/api/v1/auth/login` | Obtain an access token |
| `GET` | `/api/v1/auth/me` | Get the authenticated user |
| `POST` | `/api/v1/accounts/` | Create an account for the authenticated user |

The login endpoint uses the OAuth2 password form. The email is sent through the standard `username` field.

## Tests and quality

From `backend/`:

```bash
python -m ruff format --check .
python -m ruff check .
python -m pytest -q
```

Current result:

```text
29 passed
```

## Continuous integration

GitHub Actions runs on pull requests targeting `dev` and pushes to `dev`.

The workflow starts PostgreSQL and validates:

- Ruff formatting and linting.
- Alembic migrations.
- SQLAlchemy migration consistency.
- The complete pytest suite.

## MVP status

The backend foundation is in place: authentication, relational data models, database migrations, Docker support and continuous integration are implemented.

Authenticated account creation is implemented. Development is continuing with the remaining account CRUD operations and ownership rules, followed by categories and transactions.
