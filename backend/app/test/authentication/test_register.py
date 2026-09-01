"""Integration tests for user registration.

Cover successful registration, optional names, required field validation,
and duplicate email rejection.
"""


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
