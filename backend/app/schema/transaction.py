"""Pydantic schemas for transaction create payloads and API responses."""

from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import AwareDatetime, BaseModel, ConfigDict, Field, field_validator

from app.models.transaction import TransactionType


class TransactionBase(BaseModel):
    """Shared transaction fields for create and response schemas."""

    account_id: UUID
    transaction_type: TransactionType
    amount: Decimal
    transaction_date: datetime
    category_id: UUID | None = None
    description: str | None = None


class TransactionCreate(TransactionBase):
    """Payload to create a transaction. Client-owned fields only."""

    amount: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    transaction_date: AwareDatetime
    description: str | None = Field(default=None, max_length=255)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("category_id")
    @classmethod
    def reject_category_id_until_categories_exist(
        cls,
        value: UUID | None,
    ) -> UUID | None:
        """Reject category_id until Categories CRUD is available."""

        if value is not None:
            raise ValueError("category_id is not supported yet; omit it or send null")
        return value

    @field_validator("description")
    @classmethod
    def empty_description_to_none(cls, value: str | None) -> str | None:
        """Store blank descriptions as None after whitespace strip."""

        if value == "":
            return None
        return value


class TransactionResponse(TransactionBase):
    """Public transaction representation returned by the API."""

    id: UUID
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TransactionUpdate(BaseModel):
    """Partial update payload. account_id and category_id are not editable."""

    transaction_type: TransactionType | None = None
    amount: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    transaction_date: AwareDatetime | None = None
    description: str | None = Field(default=None, max_length=255)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("transaction_type", "amount", "transaction_date")
    @classmethod
    def reject_explicit_null(cls, value: object) -> object:
        """Reject JSON null. An omitted field keeps its default and skips this."""

        if value is None:
            raise ValueError("null is not allowed")
        return value

    @field_validator("description")
    @classmethod
    def empty_description_to_none(cls, value: str | None) -> str | None:
        """Store blank descriptions as None after whitespace strip."""

        if value == "":
            return None
        return value
