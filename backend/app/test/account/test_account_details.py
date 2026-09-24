"""API tests for retrieving a user-owned account by id."""

from uuid import uuid4


def test_get_account_by_id_success(client, authenticated_user, account_owned):
    """Return an account when it belongs to the authenticated user."""

    response = client.get(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json()["id"] == account_owned["id"]
    assert response.json()["name"] == account_owned["name"]


def test_get_account_by_id_without_token(client, account_owned):
    """Reject an account lookup when authentication is missing."""

    response = client.get(
        f"/api/v1/accounts/{account_owned['id']}",
    )

    assert response.status_code == 401


def test_get_account_by_id_returns_404_for_different_user(
    client,
    account_owned,
    other_authenticated_user,
):
    """Prevent a user from accessing another user's account."""

    response = client.get(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=other_authenticated_user["headers"],
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
