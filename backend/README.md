# Billax 2.0

Billax 2.0 is a personal finance application built with **FastAPI** and **PostgreSQL**.

The project is currently under development. The backend MVP currently focuses on authentication and establishing the foundation for future financial features.

## Backend Stack

* Python 3.12
* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic
* bcrypt
* python-jose
* pytest

## Current Features

* User registration
* Password hashing
* Login with JWT access tokens
* Protected user profile endpoint
* Inactive-user validation
* Authentication and JWT tests

Refresh tokens and financial features are planned for later development.

## Architecture

The backend uses a layered structure:

* `api/` — endpoints, dependencies, and exception handlers
* `service/` — business logic and authentication
* `repositories/` — database access
* `models/` — SQLAlchemy models
* `schema/` — Pydantic schemas
* `core/` — JWT, password hashing, and custom exceptions
* `config/` — application settings
* `database/` — database configuration and sessions
* `test/` — automated tests

## Local Setup

From the repository root:

```bash
cd backend

python3.12 -m venv venv
source venv/bin/activate

python -m pip install -r requirements.txt

cp -n .env.example .env
```

Configure `.env`, especially:

* `DATABASE_URL`
* `SECRET_KEY`

Create the database:

```bash
createdb -h 127.0.0.1 -U YOUR_DB_USER billax
```

Apply migrations:

```bash
python -m alembic upgrade head
```

Start the API:

```bash
python -m uvicorn app.main:app --reload
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## Authentication Endpoints

| Method | Endpoint                | Purpose                          |
| ------ | ----------------------- | -------------------------------- |
| `POST` | `/api/v1/auth/register` | Register a user                  |
| `POST` | `/api/v1/auth/login`    | Login and obtain an access token |
| `GET`  | `/api/v1/auth/me`       | Get the authenticated user       |

Protected routes require:

```text
Authorization: Bearer <access_token>
```

## Tests

Tests use a separate PostgreSQL database.

```bash
createdb -h 127.0.0.1 -U YOUR_DB_USER billax_test
```

Update `TEST_DATABASE_URL` in:

```text
app/test/conftest.py
```

Run the test suite:

```bash
python -m pytest -q
```

## Project Status

The current focus is building a solid backend foundation with authentication, database persistence, migrations, and automated testing before implementing the main personal-finance features.