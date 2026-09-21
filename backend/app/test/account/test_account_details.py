from uuid import uuid4

from app.core.jwt import create_access_token
from app.models import User


def test_get_account_by_id_success(client, authenticated_user):
    """Return an account when it belongs to the authenticated user."""

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

    response = client.get(
        f"/api/v1/accounts/{account_id}",
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["id"] == account_id
    assert response.json()["name"] == "Main Checking"


def test_get_account_by_id_returns_404_for_different_user(
    client,
    authenticated_user,
    db_session,
):
    """Prevent a user from accessing another user's account."""

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

    response = client.get(
        f"/api/v1/accounts/{account_id}",
        headers=other_headers,
    )

    assert response.status_code == 404


def test_get_account_by_id_returns_404_when_account_does_not_exist(
    client,
    authenticated_user,
):
    """Return 404 when the requested account does not exist."""

    account_id = uuid4()

    response = client.get(
        f"/api/v1/accounts/{account_id}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 404
