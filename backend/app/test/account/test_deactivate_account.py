"""API tests for deactivating a user-owned account."""


def test_deactivate_account_success_200(client, authenticated_user, account_payload):
    """Deactivate an owned account and return 200."""

    create_account = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json={**account_payload},
    )

    account = create_account.json()

    response = client.patch(
        f"/api/v1/accounts/{account['id']}/deactivate",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json()["is_active"] == False


def test_deactivate_account_without_token(client, authenticated_user, account_payload):
    """Reject deactivate when authentication is missing."""

    headers = authenticated_user["headers"]

    create_account = client.post(
        "/api/v1/accounts/",
        headers=headers,
        json={**account_payload},
    )

    account = create_account.json()

    response = client.patch(
        f"/api/v1/accounts/{account['id']}/deactivate",
    )

    assert response.status_code == 401


def test_deactivate_account_returns_404_for_different_user(
    client, authenticated_user, other_authenticated_user, account_payload
):
    """Prevent a user from deactivating another user's account."""

    create_response = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json={**account_payload},
    )

    account_id = create_response.json()["id"]

    response = client.patch(
        f"/api/v1/accounts/{account_id}/deactivate",
        headers=other_authenticated_user["headers"],
    )

    assert response.status_code == 404
