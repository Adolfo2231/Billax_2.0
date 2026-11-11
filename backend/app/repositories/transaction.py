"""Data access operations for transactions."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Account, Transaction

from .base import BaseRepository


class TransactionRepository(BaseRepository[Transaction]):
    """Provide persistence operations for transactions."""

    def __init__(self, db: Session) -> None:
        """Initialize the repository with a database session."""

        super().__init__(db=db, model=Transaction)

    def get_all_by_user_id(self, user_id: UUID) -> list[Transaction]:
        """Return all transactions for accounts owned by the specified user."""

        statement = (
            select(Transaction)
            .join(Account, Transaction.account_id == Account.id)
            .where(Account.user_id == user_id)
            .order_by(
                Transaction.transaction_date.desc(),
                Transaction.created_at.desc(),
            )
        )
        result = self.db.execute(statement)

        return result.scalars().all()
