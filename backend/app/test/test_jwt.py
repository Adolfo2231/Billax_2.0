"""Tests for JWT access token generation and validation."""

from datetime import datetime, timedelta, timezone

import pytest
from jose import JWTError, jwt

from app.config import settings
from app.core import create_access_token, decode_access_token


def test_jwt_access_token():
    """Verify that a valid access token returns the original subject."""

    subject = "user123"

    token = create_access_token(subject)
    decode_subject = decode_access_token(token)

    assert decode_subject == subject


def test_jwt_invalid_access_token():
    """Verify that an invalid token raises JWTError."""

    invalid_token = "invalid_token"

    with pytest.raises(JWTError):
        decode_access_token(invalid_token)


def test_jwt_without_sub():
    """Verify that a token without a subject claim is rejected."""

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )

    payload = {
        "exp": expire,
    }

    token = jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)

    with pytest.raises(JWTError):
        decode_access_token(token)


def test_jwt_expired_access_token():
    """Verify that an expired access token raises JWTError."""

    expire = datetime.now(timezone.utc) - timedelta(minutes=1)

    payload = {
        "sub": "user123",
        "exp": expire,
    }
    expired_token = jwt.encode(
        payload,
        settings.secret_key,
        algorithm=settings.algorithm,
    )

    with pytest.raises(JWTError):
        decode_access_token(expired_token)
