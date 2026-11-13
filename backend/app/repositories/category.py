"""Data access operations for categories."""

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Category

from .base import BaseRepository


class CategoryRepository(BaseRepository[Category]):
    """Provide category queries scoped to their owning user."""

    def __init__(self, db: Session) -> None:
        """Initialize the repository with a database session."""

        super().__init__(db=db, model=Category)

    def get_all_by_user_id(self, user_id: UUID) -> list[Category]:
        """Return all active categories owned by the specified user."""

        statement = (
            select(Category)
            .where(
                Category.user_id == user_id,
                Category.is_active.is_(True),
            )
            .order_by(Category.name)
        )
        result = self.db.execute(statement)

        return result.scalars().all()

    def get_category_by_id(
        self,
        user_id: UUID,
        category_id: UUID,
    ) -> Category | None:
        """Return a user's active category by ID, or ``None`` when missing."""

        statement = select(Category).where(
            Category.user_id == user_id,
            Category.id == category_id,
            Category.is_active.is_(True),
        )
        result = self.db.execute(statement)

        return result.scalar_one_or_none()
