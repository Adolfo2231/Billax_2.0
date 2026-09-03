"""User SQLAlchemy model for authentication and profile data."""

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .account import Account

from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class User(BaseModel):
    """Represent a Billax user stored in the database."""

    __tablename__ = "users"

    email: Mapped[str] = mapped_column(nullable=False, unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        default=True,
        nullable=False,
    )

    first_name: Mapped[str | None] = mapped_column(nullable=True)

    last_name: Mapped[str | None] = mapped_column(nullable=True)

    accounts: Mapped[list["Account"]] = relationship(back_populates="user")
