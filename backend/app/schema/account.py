from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.account import AccountType


class AccountBase(BaseModel):
    name: str = Field(min_length=1)
    account_type: AccountType


class AccountCreate(AccountBase):
    balance: Decimal = Field(
        default=Decimal("0.00"), ge=0, max_digits=12, decimal_places=2
    )


class AccountResponse(AccountBase):
    id: UUID
    user_id: UUID
    balance: Decimal
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AccountUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
    )
    account_type: AccountType | None = None
    balance: Decimal | None = Field(default=None, ge=0, max_digits=12, decimal_places=2)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("name", "account_type", "balance")
    @classmethod
    def reject_explicit_null(cls, value: object) -> object:
        """Reject JSON null. An omitted field keeps its default and skips this."""

        if value is None:
            raise ValueError("null is not allowed")
        return value
