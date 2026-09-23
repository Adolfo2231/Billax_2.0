from uuid import uuid4

from app.core.jwt import create_access_token
from app.models import User


def test_update_account_success(client, authenticated_user):
    """Update only the fields sent in a partial account update."""

    headers = authenticated_user["headers"]

    create_response = client.post(
        "/api/v1/accounts/",
        headers=headers,
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    account_id = create_response.json()["id"]

    update_response = client.patch(
        f"/api/v1/accounts/{account_id}",
        headers=headers,
        json={"name": "Banco Popular"},
    )

    assert update_response.status_code == 200
    data = update_response.json()

    assert data["name"] == "Banco Popular"
    assert data["id"] == account_id
    assert data["account_type"] == "checking"
    assert data["balance"] == "250.00"


def test_update_account_without_token(client):
    """Reject an account update when authentication is missing."""

    response = client.patch(
        f"/api/v1/accounts/{uuid4()}",
        json={
            "name": "Banco Popular",
        },
    )

    assert response.status_code == 401


def test_update_account_returns_404_for_different_user(
    client,
    authenticated_user,
    db_session,
):
    """Prevent a user from updating another user's account."""

    create_response = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json={
            "name": "Owner Checking",
            "account_type": "checking",
            "balance": "100.00",
        },
    )

    account_id = create_response.json()["id"]

    other_user = User(
        email="other-user@example.com",
        password_hash="fake-hash",
        is_active=True,
    )
    db_session.add(other_user)
    db_session.commit()
    db_session.refresh(other_user)

    other_headers = {
        "Authorization": f"Bearer {create_access_token(str(other_user.id))}"
    }

    response = client.patch(
        f"/api/v1/accounts/{account_id}",
        headers=other_headers,
        json={"name": "Stolen"},
    )

    assert response.status_code == 404


def test_update_account_returns_404_when_account_does_not_exist(
    client,
    authenticated_user,
):
    """Return 404 when the account to update does not exist."""

    response = client.patch(
        f"/api/v1/accounts/{uuid4()}",
        headers=authenticated_user["headers"],
        json={"name": "Banco Popular"},
    )

    assert response.status_code == 404
