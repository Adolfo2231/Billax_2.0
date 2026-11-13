"""API tests for partially updating a user-owned transaction."""

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


def test_update_transaction_success(client, authenticated_user, account_owned):
    """Update only the fields sent; leave the rest unchanged."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
        json={"description": "Café con leche"},
    )

    assert response.status_code == 200
    data = response.json()

    assert data["description"] == "Café con leche"
    assert data["id"] == created["id"]
    assert data["account_id"] == created["account_id"]
    assert data["transaction_type"] == created["transaction_type"]
    assert data["amount"] == created["amount"]
    assert data["transaction_date"] == created["transaction_date"]
    assert data["category_id"] == created["category_id"]


def test_update_transaction_without_token(client):
    """Reject a transaction update when authentication is missing."""

    response = client.patch(
        f"/api/v1/transactions/{uuid4()}",
        json={"description": "Sin token"},
    )

    assert response.status_code == 401


def test_update_transaction_returns_404_for_different_user(
    client,
    authenticated_user,
    account_owned,
    other_authenticated_user,
):
    """Prevent a user from updating another user's transaction."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=other_authenticated_user["headers"],
        json={"description": "Stolen"},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Transaction not found"

    unchanged = client.get(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )

    assert unchanged.status_code == 200
    assert unchanged.json()["description"] == created["description"]


def test_update_transaction_rejects_account_id(
    client,
    authenticated_user,
    account_owned,
):
    """Reject account_id because moving accounts is out of scope."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
        json={"account_id": str(uuid4())},
    )

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][1] == "account_id"


def test_update_transaction_explicit_null_amount_422(
    client,
    authenticated_user,
    account_owned,
):
    """Reject explicit null on amount instead of clearing a required field."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
        json={"amount": None},
    )

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][1] == "amount"

    unchanged = client.get(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
    )

    assert unchanged.status_code == 200
    assert unchanged.json()["amount"] == created["amount"]


def test_update_transaction_clears_description_with_null(
    client,
    authenticated_user,
    account_owned,
):
    """Allow explicit null on description to clear an optional field."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )
    assert created["description"] == "Café"

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
        json={"description": None},
    )

    assert response.status_code == 200
    data = response.json()

    assert data["description"] is None
    assert data["amount"] == created["amount"]
    assert data["transaction_type"] == created["transaction_type"]
    assert data["transaction_date"] == created["transaction_date"]


def test_update_transaction_with_owned_category(
    client,
    authenticated_user,
    account_owned,
):
    """Allow assigning an owned active category on update."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    category = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "Food"},
    )
    assert category.status_code == 201
    category_id = category.json()["id"]

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
        json={"category_id": category_id},
    )

    assert response.status_code == 200
    assert response.json()["category_id"] == category_id


def test_update_transaction_clears_category_with_null(
    client,
    authenticated_user,
    account_owned,
):
    """Allow explicit null on category_id to unlink an optional category."""

    category = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "Food"},
    )
    assert category.status_code == 201
    category_id = category.json()["id"]

    created = client.post(
        "/api/v1/transactions/",
        headers=authenticated_user["headers"],
        json={
            "account_id": account_owned["id"],
            "transaction_type": "expense",
            "amount": "50.00",
            "transaction_date": "2026-11-10T15:00:00Z",
            "category_id": category_id,
        },
    )
    assert created.status_code == 201
    assert created.json()["category_id"] == category_id

    response = client.patch(
        f"/api/v1/transactions/{created.json()['id']}",
        headers=authenticated_user["headers"],
        json={"category_id": None},
    )

    assert response.status_code == 200
    assert response.json()["category_id"] is None


def test_update_transaction_returns_404_for_foreign_category(
    client,
    authenticated_user,
    other_authenticated_user,
    account_owned,
):
    """Reject update when category_id belongs to another user."""

    created = _create_transaction(
        client,
        authenticated_user["headers"],
        account_owned["id"],
    )

    foreign = client.post(
        "/api/v1/categories/",
        headers=other_authenticated_user["headers"],
        json={"name": "Other Food"},
    )
    assert foreign.status_code == 201

    response = client.patch(
        f"/api/v1/transactions/{created['id']}",
        headers=authenticated_user["headers"],
        json={"category_id": foreign.json()["id"]},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Category not found"
