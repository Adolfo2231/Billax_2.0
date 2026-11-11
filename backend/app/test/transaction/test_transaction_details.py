"""API tests for retrieving a user-owned transaction by id."""

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


def test_get_transaction_by_id_success(client, authenticated_user, account_owned):
    """Return a transaction when it belongs to the authenticated user."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.get(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == created


def test_get_transaction_by_id_without_token(client, authenticated_user, account_owned):
    """Reject a transaction lookup when authentication is missing."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.get(
        f"/api/v1/transactions/{created['id']}",
    )

    assert response.status_code == 401


def test_get_transaction_by_id_returns_404_for_different_user(
    client,
    authenticated_user,
    account_owned,
    other_authenticated_user,
):
    """Prevent a user from accessing another user's transaction."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.get(
        f"/api/v1/transactions/{created['id']}",
        headers=other_authenticated_user["headers"],
    )

    assert response.status_code == 404


def test_get_transaction_by_id_returns_404_when_transaction_does_not_exist(
    client,
    authenticated_user,
):
    """Return 404 when the requested transaction does not exist."""

    transaction_id = uuid4()

    response = client.get(
        f"/api/v1/transactions/{transaction_id}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 404
