"""SQLAlchemy model for user-owned transaction categories."""

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .transaction import Transaction
    from .user import User


class Category(BaseModel):
    """Represent a transaction category owned by a Billax user."""

    __tablename__ = "categories"

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(nullable=False)

    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)

    user: Mapped["User"] = relationship(back_populates="categories")

    transactions: Mapped[list["Transaction"]] = relationship(back_populates="category")
