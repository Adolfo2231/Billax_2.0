# Billax 2.0

[![Backend CI](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml/badge.svg?branch=dev)](https://github.com/Adolfo2231/Billax_2.0/actions/workflows/backend-ci.yml)

Billax 2.0 is a personal finance application designed to help users organize accounts, categories and financial transactions through a secure API and web interface.

The project is being developed as a monorepo with a FastAPI backend and a React frontend.

## Tech stack

**Backend:** Python 3.12, FastAPI, SQLAlchemy, PostgreSQL, Alembic, Pydantic and JWT/OAuth2.

**Frontend:** React, TypeScript and Vite.

**Development:** Docker, Docker Compose, pytest, Ruff and GitHub Actions.

## Implemented features

* User registration with password hashing.
* OAuth2 login with JWT access tokens.
* Protected endpoint for retrieving the authenticated user.
* Validation for inactive users.
* Relational models for users, accounts, categories and transactions.
* Pydantic schemas for authentication, users and accounts.
* PostgreSQL migrations managed with Alembic.
* Dockerized backend and PostgreSQL services.
* Automated formatting, linting, migration and test checks.
* 29 passing backend tests.

## Project structure

```text
billax-2.0/
├── backend/                 # FastAPI API and backend business logic
│   ├── alembic/             # Database migrations
│   ├── app/                 # Application source code and tests
│   ├── Dockerfile
│   ├── README.md            # Detailed backend documentation
│   └── requirements.txt
├── frontend/                # React and TypeScript application
├── docs/                    # Project documentation
├── .github/workflows/       # Continuous integration workflows
├── docker-compose.yml
└── README.md
```

The backend follows a layered request flow:

```text
HTTP request → API → Service → Repository → PostgreSQL
```

## Run with Docker

Requirements:

* Docker Desktop
* Docker Compose

From the project root:

```bash
docker compose up --build -d
```

The command starts PostgreSQL, applies the Alembic migrations and launches the FastAPI backend.

Verify the services:

```bash
docker compose ps
curl http://127.0.0.1:8000/
```

API documentation:

* Swagger UI: http://127.0.0.1:8000/docs
* OpenAPI schema: http://127.0.0.1:8000/openapi.json

Stop the environment:

```bash
docker compose down
```

> `docker compose down -v` also deletes the local PostgreSQL data volume.

## Local backend setup

From the project root:

```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
```

Update `.env` with valid local PostgreSQL credentials. Then apply the migrations and start the API:

```bash
python -m alembic upgrade head
python -m uvicorn app.main:app --reload
```

For complete environment configuration and backend commands, see [`backend/README.md`](backend/README.md).

## Tests and continuous integration

Run the backend quality checks from `backend/`:

```bash
python -m ruff format --check .
python -m ruff check .
python -m pytest -q
```

The current test suite contains 29 passing tests.

GitHub Actions runs the same backend checks on:

* Pull requests targeting `dev`.
* Pushes to `dev`.

The workflow also starts PostgreSQL, applies the migrations and verifies that the SQLAlchemy models are synchronized with Alembic.

## Current MVP status

Billax 2.0 is under active development.

Authentication, relational data models, database migrations, Docker support and continuous integration are implemented. CRUD endpoints and ownership rules for accounts, categories and transactions are the next backend development stage.

The frontend is currently in its initial development stage.
