# Billax 2.0

Monorepo for the Billax 2.0 platform.

## Structure

```text
billax-2.0/
├── backend/                 # FastAPI API and business logic
│   ├── app/                 # Application package (config, database, ...)
│   ├── alembic/             # Migration scripts (env.py, versions/)
│   ├── alembic.ini          # Alembic configuration
│   ├── requirements.txt
│   └── .env.example         # Environment template (copy to .env)
├── frontend/                # Web application
├── docs/                    # Project documentation
├── docker-compose.yml
└── README.md
```

## Status

🚧 MVP under development

## Backend setup

Work from the `backend/` directory. Use a virtual environment; do not commit `.venv` or `.env`.

### 1. Virtual environment (Windows)

```powershell
cd backend
python -m venv .venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

### 2. Environment

```powershell
Copy-Item .\.env.example .\.env
```

Edit `.env` and set a real `DATABASE_URL` for your local PostgreSQL, for example:

```text
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/billax
```

Create the database if it does not exist (PostgreSQL must be running).

### 3. Database migrations (Alembic)

With the venv active, from `backend/`:

```powershell
alembic upgrade head
alembic current
```

Alembic loads `DATABASE_URL` through `app.config.settings` in `alembic/env.py` (same source as the API).
