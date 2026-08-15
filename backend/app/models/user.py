"""
User database model for the Billax 2.0 application.

Defines the User SQLAlchemy model, including authentication,
profile, and account status fields.
"""

from sqlalchemy.orm import Mapped, mapped_column

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
