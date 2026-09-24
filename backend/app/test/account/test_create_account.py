"""API tests for creating and listing user-owned accounts."""


def test_create_account_success(client, authenticated_user, account_payload):
    """Create an account for an authenticated user."""

    response = client.post(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
        json=account_payload,
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == account_payload["name"]
    assert data["account_type"] == account_payload["account_type"]
    assert data["balance"] == account_payload["balance"]
    assert data["user_id"] == str(authenticated_user["user"].id)
    assert data["is_active"] is True


def test_create_account_without_token(client, account_payload):
    """Reject account creation when authentication is missing."""

    response = client.post(
        "/api/v1/accounts/",
        json=account_payload,
    )

    assert response.status_code == 401


def test_list_accounts_without_token(client):
    """Reject listing accounts when authentication is missing."""

    response = client.get("/api/v1/accounts/")

    assert response.status_code == 401


def test_list_accounts_for_authenticated_user(
    client,
    authenticated_user,
    account_owned,
):
    """List only the accounts available to the authenticated user."""

    response = client.get(
        "/api/v1/accounts/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == [account_owned]
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
    account_owned,
    other_authenticated_user,
):
    """Keep another user's accounts out of the authenticated user's list."""

    response = client.get(
        "/api/v1/accounts/",
        headers=other_authenticated_user["headers"],
    )

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
