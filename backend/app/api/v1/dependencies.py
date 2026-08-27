"""FastAPI dependencies for injecting services and repositories."""

from typing import Annotated
from uuid import UUID

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.core import decode_access_token
from app.core.exceptions import AuthenticationError
from app.database.dependencies import get_db
from app.models import User
from app.repositories import UserRepository
from app.service import UserService

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
)


def get_user_service(
    db: Annotated[Session, Depends(get_db)],
) -> UserService:
    """Provide a UserService instance wired with a database session."""
    repository = UserRepository(db)

    return UserService(repository)


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    service: Annotated[UserService, Depends(get_user_service)],
) -> User:
    """Return the authenticated user from the Bearer access token."""

    try:
        subject = decode_access_token(token)
        user_id = UUID(subject)

    except (ValueError, JWTError):
        raise AuthenticationError()

    user = service.user_repository.get_by_id(user_id)

    if user is None:
        raise AuthenticationError()

    return user
