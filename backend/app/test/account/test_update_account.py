"""API tests for updating a user-owned account."""

from uuid import uuid4


def test_update_account_success(client, authenticated_user, account_owned):
    """Update only the fields sent in a partial account update."""

    update_response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
        json={"name": "Banco Popular"},
    )

    assert update_response.status_code == 200
    data = update_response.json()

    assert data["name"] == "Banco Popular"
    assert data["id"] == account_owned["id"]
    assert data["account_type"] == account_owned["account_type"]
    assert data["balance"] == account_owned["balance"]


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
    account_owned,
    other_authenticated_user,
):
    """Prevent a user from updating another user's account."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=other_authenticated_user["headers"],
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
