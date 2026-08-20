"""Data access layer for user persistence and queries."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import User


class UserRepository:
    """Handle user persistence and database queries."""

    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> User | None:
        """Return a user by email, or None if no user exists."""

        statement = select(User).where(User.email == email)

        result = self.db.execute(statement)

        return result.scalar_one_or_none()

    def create_user(self, user: User) -> User:
        """Persist a new user in the database and return it."""

        self.db.add(user)
        self.db.flush()
        self.db.refresh(user)

        return user
