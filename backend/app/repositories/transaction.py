"""Data access operations for transactions."""

from sqlalchemy.orm import Session

from app.models import Transaction

from .base import BaseRepository


class TransactionRepository(BaseRepository[Transaction]):
    """Provide persistence operations for transactions."""

    def __init__(self, db: Session) -> None:
        """Initialize the repository with a database session."""

        super().__init__(db=db, model=Transaction)
