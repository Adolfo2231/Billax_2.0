"""API tests for creating user-owned account transactions."""

from uuid import uuid4


def test_create_transaction_success(client, authenticated_user, account_owned):
    """Create a transaction on an account owned by the authenticated user."""

    payload = {
        "account_id": account_owned["id"],
        "transaction_type": "expense",
        "amount": "50.00",
        "transaction_date": "2026-11-10T15:00:00Z",
        "description": "Café",
    }

    response = client.post(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
        json=payload,
    )

    assert response.status_code == 201

    data = response.json()

    assert data["account_id"] == account_owned["id"]
    assert data["transaction_type"] == "expense"
    assert data["amount"] == "50.00"
    assert data["description"] == "Café"
    assert data["category_id"] is None
    assert data["is_active"] is True
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_create_transaction_without_token(client, account_owned):
    """Reject transaction creation when authentication is missing."""

    payload = {
        "account_id": account_owned["id"],
        "transaction_type": "income",
        "amount": "100.00",
        "transaction_date": "2026-11-10T15:00:00Z",
    }

    response = client.post(
        "/api/v1/transactions/",
        json=payload,
    )

    assert response.status_code == 401


def test_create_transaction_returns_404_for_different_user(
    client,
    account_owned,
    other_authenticated_user,
):
    """Prevent creating a transaction on another user's account."""

    payload = {
        "account_id": account_owned["id"],
        "transaction_type": "expense",
        "amount": "25.00",
        "transaction_date": "2026-11-10T15:00:00Z",
    }

    response = client.post(
        "/api/v1/transactions/",
        headers=other_authenticated_user["headers"],
        json=payload,
    )

    assert response.status_code == 404


def test_create_transaction_returns_404_when_account_does_not_exist(
    client,
    authenticated_user,
):
    """Return 404 when the target account does not exist."""

    payload = {
        "account_id": str(uuid4()),
        "transaction_type": "income",
        "amount": "10.00",
        "transaction_date": "2026-11-10T15:00:00Z",
    }

    response = client.post(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
        json=payload,
    )

    assert response.status_code == 404


def test_create_transaction_rejects_category_id(
    client,
    authenticated_user,
    account_owned,
):
    """Reject create payloads that include a category_id."""

    payload = {
        "account_id": account_owned["id"],
        "transaction_type": "expense",
        "amount": "15.00",
        "transaction_date": "2026-11-10T15:00:00Z",
        "category_id": str(uuid4()),
    }

    response = client.post(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
        json=payload,
    )

    assert response.status_code == 422
