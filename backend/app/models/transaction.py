from datetime import datetime, timezone
from decimal import Decimal
from enum import Enum as PyEnum
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import DateTime, ForeignKey, Numeric
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseModel

if TYPE_CHECKING:
    from .account import Account
    from .category import Category


class TransactionType(str, PyEnum):
    """Supported transaction types."""

    INCOME = "income"
    EXPENSE = "expense"


class Transaction(BaseModel):
    __tablename__ = "transactions"

    account_id: Mapped[UUID] = mapped_column(
        ForeignKey("accounts.id"),
        nullable=False,
    )

    category_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("categories.id"),
        nullable=True,
    )

    transaction_type: Mapped[TransactionType] = mapped_column(
        SAEnum(
            TransactionType,
            values_callable=lambda enum_cls: [item.value for item in enum_cls],
        ),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        nullable=False,
        default=True,
    )

    amount: Mapped[Decimal] = mapped_column(
        Numeric(12, 2),
        nullable=False,
    )

    transaction_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        nullable=True,
    )

    account: Mapped["Account"] = relationship(
        back_populates="transactions",
    )

    category: Mapped["Category | None"] = relationship(
        back_populates="transactions",
    )
