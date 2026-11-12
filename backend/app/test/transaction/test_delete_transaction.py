"""API tests for soft-deleting a user-owned transaction."""

from uuid import uuid4


def _create_transaction(client, headers, account_id):
    """Create a transaction via the API and return the response body."""

    response = client.post(
        "/api/v1/transactions/",
        headers=headers,
        json={
            "account_id": account_id,
            "transaction_type": "expense",
            "amount": "50.00",
            "transaction_date": "2026-11-10T15:00:00Z",
            "description": "Café",
        },
    )
    assert response.status_code == 201
    return response.json()


def test_delete_transaction_success_204(client, authenticated_user, account_owned):
    """Soft-delete an owned transaction and hide it from detail and list."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.delete(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 204
    assert response.content == b""

    detail = client.get(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )
    assert detail.status_code == 404
    assert detail.json()["detail"] == "Transaction not found"

    listing = client.get(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
    )
    assert listing.status_code == 200
    assert all(item["id"] != created["id"] for item in listing.json())


def test_delete_transaction_without_token(client, authenticated_user, account_owned):
    """Reject delete when authentication is missing."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.delete(
        f"/api/v1/transactions/{created['id']}",
    )

    assert response.status_code == 401


def test_delete_transaction_returns_404_for_different_user(
    client,
    authenticated_user,
    account_owned,
    other_authenticated_user,
):
    """Prevent a user from deleting another user's transaction."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.delete(
        f"/api/v1/transactions/{created['id']}",
        headers=other_authenticated_user["headers"],
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Transaction not found"

    still_there = client.get(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )
    assert still_there.status_code == 200
    assert still_there.json()["id"] == created["id"]


def test_delete_transaction_returns_404_when_already_deleted(
    client,
    authenticated_user,
    account_owned,
):
    """Return 404 on a second delete of the same transaction."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    first = client.delete(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )
    assert first.status_code == 204

    second = client.delete(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )
    assert second.status_code == 404
    assert second.json()["detail"] == "Transaction not found"


def test_delete_transaction_returns_404_when_transaction_does_not_exist(
    client,
    authenticated_user,
):
    """Return 404 when the requested transaction does not exist."""

    response = client.delete(
        f"/api/v1/transactions/{uuid4()}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Transaction not found"
