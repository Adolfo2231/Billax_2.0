"""API tests for listing user-owned account transactions."""

from uuid import uuid4


def _create_transaction(
    client, headers, account_id, *, amount, transaction_date, description=None
):
    """Create a transaction via the API and return the response body."""

    payload = {
        "account_id": account_id,
        "transaction_type": "expense",
        "amount": amount,
        "transaction_date": transaction_date,
    }
    if description is not None:
        payload["description"] = description

    response = client.post(
        "/api/v1/transactions/",
        headers=headers,
        json=payload,
    )
    assert response.status_code == 201
    return response.json()


def test_list_transactions_without_token(client):
    """Reject listing transactions when authentication is missing."""

    response = client.get("/api/v1/transactions/")

    assert response.status_code == 401


def test_list_transactions_empty_for_authenticated_user(client, authenticated_user):
    """Return an empty list when the authenticated user has no transactions."""

    response = client.get(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == []


def test_list_transactions_for_authenticated_user(
    client,
    authenticated_user,
    account_owned,
):
    """List the authenticated user's transactions, newest first."""

    # Create the later date first so ordering must use transaction_date,
    # not insertion / created_at order.
    newer = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
        amount="20.00",
        transaction_date="2026-11-10T12:00:00Z",
        description="newer",
    )
    older = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
        amount="10.00",
        transaction_date="2026-11-01T12:00:00Z",
        description="older",
    )

    response = client.get(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    data = response.json()
    assert data == [newer, older]


def test_list_transactions_does_not_include_other_users_transactions(
    client,
    authenticated_user,
    account_owned,
    other_authenticated_user,
):
    """Keep another user's transactions out of the authenticated user's list."""

    _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
        amount="50.00",
        transaction_date="2026-11-10T15:00:00Z",
    )

    response = client.get(
        "/api/v1/transactions/",
        headers=other_authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == []


def test_created_transaction_appears_in_list(
    client,
    authenticated_user,
    account_owned,
):
    """Confirm a successfully created transaction shows up in the list."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
        amount="50.00",
        transaction_date="2026-11-10T15:00:00Z",
        description="Café",
    )

    response = client.get(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == [created]


def test_failed_create_does_not_persist_transaction(
    client,
    authenticated_user,
    account_owned,
    other_authenticated_user,
):
    """Ensure a 404 create leaves no transaction for the account owner."""

    failed = client.post(
        "/api/v1/transactions/",
        headers=other_authenticated_user["headers"],
        json={
            "account_id": account_owned["id"],
            "transaction_type": "expense",
            "amount": "25.00",
            "transaction_date": "2026-11-10T15:00:00Z",
        },
    )
    assert failed.status_code == 404

    missing_account = client.post(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
        json={
            "account_id": str(uuid4()),
            "transaction_type": "income",
            "amount": "10.00",
            "transaction_date": "2026-11-10T15:00:00Z",
        },
    )
    assert missing_account.status_code == 404

    response = client.get(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    assert response.json() == []
