"""Generic repository base class with shared CRUD operations."""

from typing import Generic, TypeVar
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):
    """Provide common database persistence operations for a SQLAlchemy model."""

    def __init__(self, db: Session, model: type[ModelType]) -> None:
        """Initialize the repository with a database session and model class."""

        self.db = db
        self.model = model

    def create(self, obj: ModelType) -> ModelType:
        """Persist a new entity and return it with generated fields populated."""

        self.db.add(obj)
        self.db.flush()
        self.db.refresh(obj)

        return obj

    def get_by_id(self, obj_id: UUID) -> ModelType | None:
        """Return an entity by primary key, or None if it does not exist."""

        statment = select(self.model).where(self.model.id == obj_id)

        result = self.db.execute(statment)

        return result.scalar_one_or_none()
