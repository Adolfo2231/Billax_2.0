"""FastAPI dependencies for injecting services and repositories."""

from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.repositories.user import UserRepository
from app.service import UserService


def get_user_service(
    db: Annotated[Session, Depends(get_db)],
) -> UserService:
    """Provide a UserService instance wired with a database session."""
    repository = UserRepository(db)

    return UserService(repository)
