"""Integration tests for authentication endpoints and protected routes."""

from uuid import uuid4

from app.core import create_access_token


def test_register_success(client):
    """Verify that a valid user registration returns 201."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
            "first_name": "Test",
            "last_name": "User",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["email"] == "test@example.com"
    assert data["first_name"] == "Test"
    assert data["last_name"] == "User"
    assert data["is_active"] is True


def test_register_without_first_and_lastname(client):
    """Verify that optional first and last names are not required."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["email"] == "test@example.com"
    assert data["is_active"] is True


def test_register_with_empty_email(client):
    """Verify that registration rejects an empty email."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "",
            "password": "passwordtest",
        },
    )

    assert response.status_code == 422


def test_register_without_email(client):
    """Verify that registration rejects a missing email field."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "password": "passwordtest",
        },
    )

    assert response.status_code == 422


def test_register_with_empty_password(client):
    """Verify that registration rejects an empty password."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "",
        },
    )

    assert response.status_code == 422


def test_register_without_password(client):
    """Verify that registration rejects a missing password field."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
        },
    )

    assert response.status_code == 422


def test_register_duplicate_email(client):
    """Verify that registering an existing email returns 409."""
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    assert response.status_code == 201

    response2 = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "passwordtest",
        },
    )

    assert response2.status_code == 409

    data = response2.json()

    assert data["detail"] == "Email already exist"


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
