"""API tests for deactivating a user-owned account."""


def test_deactivate_account_success_200(client, authenticated_user, account_owned):
    """Deactivate an owned account and return 200."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}/deactivate",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json()["is_active"] == False


def test_deactivate_account_without_token(client, account_owned):
    """Reject deactivate when authentication is missing."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}/deactivate",
    )

    assert response.status_code == 401


def test_deactivate_account_returns_404_for_different_user(
    client,
    account_owned,
    other_authenticated_user,
):
    """Prevent a user from deactivating another user's account."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}/deactivate",
        headers=other_authenticated_user["headers"],
    )

    assert response.status_code == 404
