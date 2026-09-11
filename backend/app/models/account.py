"""SQLAlchemy model for user-owned financial accounts."""

from decimal import Decimal
from enum import Enum as PyEnum
from typing import TYPE_CHECKING
from uuid import UUID

if TYPE_CHECKING:
    from .transaction import Transaction
    from .user import User

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel


class AccountType(str, PyEnum):
    """Supported account types in Billax."""

    CASH = "cash"
    CHECKING = "checking"
    SAVINGS = "savings"
    CREDIT_CARD = "credit_card"


class Account(BaseModel):
    """Represent a financial account owned by a Billax user."""

    __tablename__ = "accounts"

    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        nullable=False,
    )

    account_type: Mapped[AccountType] = mapped_column(
        SAEnum(
            AccountType,
            values_callable=lambda enum_cls: [item.value for item in enum_cls],
        ),
        nullable=False,
    )

    balance: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)

    user: Mapped["User"] = relationship(back_populates="accounts")

    transactions: Mapped[list["Transaction"]] = relationship(back_populates="account")
