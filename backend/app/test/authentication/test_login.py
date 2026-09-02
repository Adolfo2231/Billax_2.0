"""Integration tests for login and protected profile access.

Cover successful login, credential validation, Bearer authentication,
and rejection of invalid tokens or nonexistent users.
"""

from uuid import uuid4

from sqlalchemy import select

from app.core.jwt import create_access_token
from app.models import User


def test_login_success(client):
    """Verify that valid credentials return an access token."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_with_empty_email(client):
    """Verify that login rejects an empty email."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "",
            "password": "passwordtest",
        },
    )

    assert response.status_code == 422


def test_login_without_email(client):
    """Verify that login rejects a missing email field."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "password": "passwordtest",
        },
    )

    assert response.status_code == 422


def test_login_with_empty_password(client):
    """Verify that login rejects an empty password."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "",
        },
    )

    assert response.status_code == 422


def test_login_without_password(client):
    """Verify that login rejects a missing password field."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "tes@example.com",
        },
    )

    assert response.status_code == 422


def test_login_with_wrong_password(client):
    """Verify that an incorrect password returns 401."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "password333",
        },
    )

    assert response.status_code == 401


def test_login_with_nonexistent_email(client):
    """Verify that login with an unknown email returns 401."""
    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    assert response.status_code == 401


def test_me_success(client):
    """Verify that an authenticated user can access the protected /me route."""
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    login_response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/api/v1/auth/me",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["email"] == "test@example.com"


def test_me_without_token(client):
    """Verify that accessing /me without a token returns 401."""
    response = client.get(
        "/api/v1/auth/me",
    )

    assert response.status_code == 401

    data = response.json()

    assert data["detail"] == "Not authenticated"


def test_me_with_wrong_token(client):
    """Verify that an invalid access token is rejected."""
    bad_token = "dafgsedgzdfaewdfeds"

    response = client.get(
        "/api/v1/auth/me",
        headers={
            "Authorization": f"Bearer {bad_token}",
        },
    )

    assert response.status_code == 401

    data = response.json()

    assert data["detail"] == "Invalid credentials"


def test_me_with_nonexistent_user(client):
    """Verify that a valid token for a nonexistent user returns 401."""
    nonexistent_user_id = str(uuid4())

    token = create_access_token(nonexistent_user_id)

    response = client.get(
        "/api/v1/auth/me",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 401

    data = response.json()

    assert data["detail"] == "Invalid credentials"


def test_login_with_inactive_user(client, db_session):
    """Reject valid credentials when the user is inactive."""
    credentials = {
        "email": "inactive@example.com",
        "password": "passwordtest",
    }

    register_response = client.post(
        "/api/v1/auth/register",
        json=credentials,
    )
    assert register_response.status_code == 201

    user = db_session.execute(
        select(User).where(User.email == credentials["email"])
    ).scalar_one()

    user.is_active = False
    db_session.commit()

    response = client.post(
        "/api/v1/auth/login",
        json=credentials,
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_me_with_user_deactivated_after_login(client, db_session):
    """Reject an existing access token after its user is deactivated."""
    credentials = {
        "email": "deactivated@example.com",
        "password": "passwordtest",
    }

    register_response = client.post(
        "/api/v1/auth/register",
        json=credentials,
    )
    assert register_response.status_code == 201

    login_response = client.post(
        "/api/v1/auth/login",
        json=credentials,
    )
    assert login_response.status_code == 200

    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Confirm the token works before deactivation.
    assert (
        client.get(
            "/api/v1/auth/me",
            headers=headers,
        ).status_code
        == 200
    )

    user = db_session.execute(
        select(User).where(User.email == credentials["email"])
    ).scalar_one()

    user.is_active = False
    db_session.commit()

    response = client.get(
        "/api/v1/auth/me",
        headers=headers,
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
