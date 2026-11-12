"""Pydantic schemas for category create payloads and API responses."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class CategoryCreate(BaseModel):
    """Payload to create a category. Client-owned fields only."""

    name: str = Field(min_length=1, max_length=100)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class CategoryUpdate(BaseModel):
    """Partial update payload for a category."""

    name: str | None = Field(default=None, min_length=1, max_length=100)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("name")
    @classmethod
    def reject_explicit_null(cls, value: object) -> object:
        """Reject JSON null. An omitted field keeps its default and skips this."""

        if value is None:
            raise ValueError("null is not allowed")
        return value


class CategoryResponse(BaseModel):
    """Public category representation returned by the API."""

    id: UUID
    name: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
