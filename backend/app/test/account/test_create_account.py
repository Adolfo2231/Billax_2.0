"""API tests for creating and listing user-owned accounts."""

from app.core.jwt import create_access_token
from app.models import User


def test_create_account_success(client, authenticated_user):
    """Create an account for an authenticated user."""

    response = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Main Checking"
    assert data["account_type"] == "checking"
    assert data["balance"] == "250.00"
    assert data["user_id"] == str(authenticated_user["user"].id)
    assert data["is_active"] is True


def test_create_account_without_token(client):
    """Reject account creation when authentication is missing."""

    response = client.post(
        "/api/v1/accounts/",
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    assert response.status_code == 401


def test_list_accounts_without_token(client):
    """Reject listing accounts when authentication is missing."""

    response = client.get("/api/v1/accounts/")

    assert response.status_code == 401


def test_list_accounts_for_authenticated_user(client, authenticated_user):
    """List only the accounts available to the authenticated user."""

    headers = authenticated_user["headers"]

    create_response = client.post(
        "/api/v1/accounts/",
        headers=headers,
        json={
            "name": "Savings",
            "account_type": "savings",
            "balance": "500.00",
        },
    )

    response = client.get("/api/v1/accounts/", headers=headers)

    assert create_response.status_code == 201
    assert response.status_code == 200
    assert response.json() == [create_response.json()]
    assert response.json()[0]["user_id"] == str(authenticated_user["user"].id)


def test_list_accounts_empty_for_authenticated_user(client, authenticated_user):
    """Return an empty list when the authenticated user has no accounts."""

    response = client.get(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == []


def test_list_accounts_does_not_include_other_users_accounts(
    client,
    authenticated_user,
    db_session,
):
    """Keep another user's accounts out of the authenticated user's list."""

    owner_account = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json={
            "name": "Owner Checking",
            "account_type": "checking",
            "balance": "100.00",
        },
    )
    assert owner_account.status_code == 201

    other_user = User(
        email="other-user@example.com",
        password_hash="fake-hash",
        is_active=True,
    )
    db_session.add(other_user)
    db_session.commit()
    db_session.refresh(other_user)

    other_headers = {
        "Authorization": f"Bearer {create_access_token(str(other_user.id))}",
    }

    response = client.get("/api/v1/accounts/", headers=other_headers)

    assert response.status_code == 200
    assert response.json() == []


def test_create_account_with_invalid_account_type(client, authenticated_user):
    """Reject account creation when its account type is unsupported."""

    response = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json={
            "name": "Bad Account",
            "account_type": "investment",
            "balance": "100.00",
        },
    )

    assert response.status_code == 422
