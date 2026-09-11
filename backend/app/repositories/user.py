"""Data access layer for user persistence and queries."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import User

from .base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Handle user persistence and database queries."""

    def __init__(self, db: Session):
        """Initialize the user repository with a database session."""

        super().__init__(db=db, model=User)

    def get_by_email(self, email: str) -> User | None:
        """Return a user by email, or None if no user exists."""

        statement = select(User).where(User.email == email)

        result = self.db.execute(statement)

        return result.scalar_one_or_none()
