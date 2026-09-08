from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.account import AccountType


class AccountBase(BaseModel):
    name: str
    account_type: AccountType


class AccountCreate(AccountBase):
    balance: Decimal = Decimal("0.00")


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
