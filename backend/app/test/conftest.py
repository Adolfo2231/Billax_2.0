"""Shared fixtures and database configuration for authentication tests.

Provide test database sessions, override the application database
dependency, and manage table setup and teardown for API tests.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings
from app.core.jwt import create_access_token
from app.database.dependencies import get_db
from app.main import app
from app.models import Base, User

test_engine = create_engine(settings.test_database_url)


TestSessionLocal = sessionmaker(
    bind=test_engine,
    autoflush=False,
    autocommit=False,
)


def override_get_db():
    """Provide a database session connected to the test database."""
    db = TestSessionLocal()

    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


# Override the production database dependency with the test database dependency.
app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    """Create a TestClient with a clean test database for each test."""
    Base.metadata.create_all(bind=test_engine)

    with TestClient(app) as test_client:
        yield test_client

    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def db_session(client):
    """Provide a test database session while the client fixture is active."""
    with TestSessionLocal() as db:
        yield db


@pytest.fixture
def authenticated_user(db_session):
    """Insert a user and return it with a valid Bearer token."""

    user = User(
        email="authenticated@example.com",
        password_hash="fake-hash",
        is_active=True,
    )

    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    token = create_access_token(str(user.id))
    return {
        "user": user,
        "headers": {"Authorization": f"Bearer {token}"},
    }


@pytest.fixture
def other_authenticated_user(db_session):
    """Insert a second user and return it with a valid Bearer token."""

    user = User(email="other@example.com", password_hash="fake-hash", is_active=True)

    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    token = create_access_token(str(user.id))

    return {"user": user, "headers": {"Authorization": f"Bearer {token}"}}


@pytest.fixture
def account_payload():
    """Return a valid account body for API requests."""

    payload = {"name": "Banco Popular", "account_type": "savings", "balance": "200.00"}

    return payload
