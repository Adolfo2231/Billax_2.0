def test_create_account_success(client):
    credentials = {
        "email": "account@example.com",
        "password": "passwordtest",
    }

    register_response = client.post(
        "/api/v1/auth/register",
        json=credentials,
    )
    assert register_response.status_code == 201

    user_id = register_response.json()["id"]

    login_response = client.post(
        "/api/v1/auth/login",
        data={
            "username": credentials["email"],
            "password": credentials["password"],
        },
    )
    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    response = client.post(
        "/api/v1/accounts/",
        headers={
            "Authorization": f"Bearer {token}",
        },
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Main Checking"
    assert data["account_type"] == "checking"
    assert data["balance"] == "250.00"
    assert data["user_id"] == user_id
    assert data["is_active"] is True


def test_create_account_without_token(client):
    response = client.post(
        "/api/v1/accounts/",
        json={
            "name": "Main Checking",
            "account_type": "checking",
            "balance": "250.00",
        },
    )

    assert response.status_code == 401


def test_create_account_with_invalid_account_type(client):
    credentials = {
        "email": "invalid-type@example.com",
        "password": "passwordtest",
    }

    client.post(
        "/api/v1/auth/register",
        json=credentials,
    )

    login_response = client.post(
        "/api/v1/auth/login",
        data={
            "username": credentials["email"],
            "password": credentials["password"],
        },
    )

    token = login_response.json()["access_token"]

    response = client.post(
        "/api/v1/accounts/",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "name": "Bad Account",
            "account_type": "investment",
            "balance": "100.00",
        },
    )

    assert response.status_code == 422
