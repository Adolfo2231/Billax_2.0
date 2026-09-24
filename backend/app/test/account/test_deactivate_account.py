"""API tests for deactivating a user-owned account."""

from app.core import create_access_token
from app.models import User


def test_deactivate_account_success_200(client, authenticated_user):
    """Deactivate an owned account and return 200."""

    headers = authenticated_user["headers"]

    create_account = client.post(
        "/api/v1/accounts/",
        headers=headers,
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    account = create_account.json()

    response = client.patch(
        f"/api/v1/accounts/{account['id']}/deactivate",
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["is_active"] == False


def test_deactivate_account_without_token(client, authenticated_user):
    """Reject deactivate when authentication is missing."""

    headers = authenticated_user["headers"]

    create_account = client.post(
        "/api/v1/accounts/",
        headers=headers,
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    account = create_account.json()

    response = client.patch(
        f"/api/v1/accounts/{account['id']}/deactivate",
    )

    assert response.status_code == 401


def test_deactivate_account_returns_404_for_different_user(
    client,
    authenticated_user,
    db_session,
):
    """Prevent a user from deactivating another user's account."""

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
        f"/api/v1/accounts/{account_id}/deactivate",
        headers=other_headers,
    )

    assert response.status_code == 404
