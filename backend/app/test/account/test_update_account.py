"""API tests for updating a user-owned account."""

from uuid import uuid4

import pytest


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
    authenticated_user,
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

    unchanged = client.get(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
    )

    assert unchanged.status_code == 200
    assert unchanged.json()["name"] == account_owned["name"]


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


def test_update_account_blank_name_422(client, authenticated_user, account_owned):
    """Reject an update when the name is only whitespace."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
        json={"name": " "},
    )

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][1] == "name"


def test_update_account_negative_balance_422(
    client,
    authenticated_user,
    account_owned,
):
    """Reject an update when the balance is negative."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
        json={"balance": "-200"},
    )

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][1] == "balance"


@pytest.mark.parametrize("field", ["name", "account_type", "balance"])
def test_update_account_explicit_null_422(
    client,
    authenticated_user,
    account_owned,
    field,
):
    """Reject explicit null instead of writing it into a NOT NULL column."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
        json={field: None},
    )

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][1] == field

    unchanged = client.get(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
    )

    assert unchanged.status_code == 200
    assert unchanged.json()[field] == account_owned[field]


def test_update_account_is_active_422(client, authenticated_user, account_owned):
    """Reject is_active because deactivation has its own endpoint."""

    response = client.patch(
        f"/api/v1/accounts/{account_owned['id']}",
        headers=authenticated_user["headers"],
        json={"is_active": False},
    )

    assert response.status_code == 422
    assert response.json()["detail"][0]["loc"][1] == "is_active"
