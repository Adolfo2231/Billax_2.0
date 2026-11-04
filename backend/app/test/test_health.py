"""Liveness endpoint tests.

Verify that the unauthenticated health check stays independent of the database.
"""


def test_health_returns_ok(client):
    """Verify that GET /health responds without a token."""

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
