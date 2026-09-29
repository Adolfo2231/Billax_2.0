from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

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
    name: str | None = None
    account_type: AccountType | None = None
    balance: Decimal | None = None
    is_active: bool | None = None
