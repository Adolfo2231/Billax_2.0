"""Smoke API tests for user-owned category CRUD."""


def _create_category(client, headers, name="Food"):
    """Create a category via the API and return the response body."""

    response = client.post(
        "/api/v1/categories/",
        headers=headers,
        json={"name": name},
    )
    assert response.status_code == 201
    return response.json()


def test_create_category_success(client, authenticated_user):
    """Create a category with stripped name and is_active true."""

    response = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "  Food  "},
    )

    assert response.status_code == 201
    data = response.json()

    assert data["name"] == "Food"
    assert data["is_active"] is True
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data


def test_list_categories_excludes_other_users_categories(
    client,
    authenticated_user,
    other_authenticated_user,
):
    """Return 200 and only categories owned by the authenticated user."""

    mine = _create_category(client, authenticated_user["headers"], name="Mine")
    other = _create_category(
        client,
        other_authenticated_user["headers"],
        name="Other",
    )

    response = client.get(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 200
    data = response.json()
    ids = [item["id"] for item in data]

    assert mine["id"] in ids
    assert other["id"] not in ids


def test_get_category_returns_404_for_different_user(
    client,
    authenticated_user,
    other_authenticated_user,
):
    """Prevent a user from reading another user's category."""

    created = _create_category(client, authenticated_user["headers"])

    response = client.get(
        f"/api/v1/categories/{created['id']}",
        headers=other_authenticated_user["headers"],
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Category not found"


def test_update_category_success_and_ownership(
    client,
    authenticated_user,
    other_authenticated_user,
):
    """Update an owned category; reject updates for another user's category."""

    created = _create_category(client, authenticated_user["headers"], name="Food")

    response = client.patch(
        f"/api/v1/categories/{created['id']}",
        headers=authenticated_user["headers"],
        json={"name": "Groceries"},
    )

    assert response.status_code == 200
    assert response.json()["name"] == "Groceries"
    assert response.json()["id"] == created["id"]

    forbidden = client.patch(
        f"/api/v1/categories/{created['id']}",
        headers=other_authenticated_user["headers"],
        json={"name": "Stolen"},
    )

    assert forbidden.status_code == 404
    assert forbidden.json()["detail"] == "Category not found"


def test_delete_category_hides_from_detail_and_list(client, authenticated_user):
    """Soft-delete returns 204 and hides the category from detail and list."""

    created = _create_category(client, authenticated_user["headers"])

    response = client.delete(
        f"/api/v1/categories/{created['id']}",
        headers=authenticated_user["headers"],
    )

    assert response.status_code == 204
    assert response.content == b""

    detail = client.get(
        f"/api/v1/categories/{created['id']}",
        headers=authenticated_user["headers"],
    )
    assert detail.status_code == 404
    assert detail.json()["detail"] == "Category not found"

    listing = client.get(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
    )
    assert listing.status_code == 200
    assert all(item["id"] != created["id"] for item in listing.json())


def test_category_endpoints_require_authentication(client):
    """Reject category requests when authentication is missing."""

    response = client.get("/api/v1/categories/")

    assert response.status_code == 401


def test_create_category_duplicate_name_returns_409(client, authenticated_user):
    """Reject a second category with the same name for the same user."""

    first = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "Food"},
    )
    assert first.status_code == 201

    duplicate = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "food"},
    )

    assert duplicate.status_code == 409
    assert duplicate.json()["detail"] == "Category already exists"


def test_update_category_duplicate_name_returns_409(client, authenticated_user):
    """Reject renaming a category to another name the user already has."""

    food = _create_category(client, authenticated_user["headers"], name="Food")
    _create_category(client, authenticated_user["headers"], name="Transport")

    response = client.patch(
        f"/api/v1/categories/{food['id']}",
        headers=authenticated_user["headers"],
        json={"name": "TRANSPORT"},
    )

    assert response.status_code == 409
    assert response.json()["detail"] == "Category already exists"


def test_different_users_can_share_category_names(
    client,
    authenticated_user,
    other_authenticated_user,
):
    """Allow the same category name across different users."""

    first = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "Food"},
    )
    second = client.post(
        "/api/v1/categories/",
        headers=other_authenticated_user["headers"],
        json={"name": "Food"},
    )

    assert first.status_code == 201
    assert second.status_code == 201


def test_create_category_reuses_name_after_soft_delete(client, authenticated_user):
    """Allow recreating a name after the previous category was soft-deleted."""

    first = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "Food"},
    )
    assert first.status_code == 201

    deleted = client.delete(
        f"/api/v1/categories/{first.json()['id']}",
        headers=authenticated_user["headers"],
    )
    assert deleted.status_code == 204

    recreated = client.post(
        "/api/v1/categories/",
        headers=authenticated_user["headers"],
        json={"name": "Food"},
    )

    assert recreated.status_code == 201
    assert recreated.json()["name"] == "Food"
    assert recreated.json()["id"] != first.json()["id"]
