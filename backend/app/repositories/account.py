"""Data access operations for accounts."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Account

from .base import BaseRepository


class AccountRepository(BaseRepository[Account]):
    """Provide account queries scoped to their owning user."""

    def __init__(self, db: Session) -> None:
        """Initialize the repository with a database session."""

        super().__init__(db=db, model=Account)

    def get_all_by_user_id(self, user_id: UUID) -> list[Account]:
        """Return all accounts owned by the specified user."""

        statement = select(Account).where(Account.user_id == user_id)
        result = self.db.execute(statement)

        return result.scalars().all()

    def get_account_by_id(self, user_id: UUID, account_id: UUID) -> Account | None:
        """Return a user's account by ID, or ``None`` when it does not exist."""

        statement = select(Account).where(
            Account.user_id == user_id,
            Account.id == account_id,
        )
        result = self.db.execute(statement)

        return result.scalar_one_or_none()
