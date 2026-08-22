"""JWT access token creation and decoding utilities."""

from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from app.config import settings


def create_access_token(subject: str) -> str:
    """Create a signed JWT access token for the given subject."""

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )

    payload = {
        "sub": subject,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.secret_key,
        algorithm=settings.algorithm,
    )


def decode_access_token(token: str) -> str:
    """Decode a JWT access token and return the subject user ID."""

    payload = jwt.decode(
        token,
        settings.secret_key,
        algorithms=[settings.algorithm],
    )

    user_id = payload.get("sub")

    if user_id is None:
        raise JWTError

    return user_id
