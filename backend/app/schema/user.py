"""Pydantic schemas for user registration, login, and responses."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserRegister(BaseModel):
    """Validate incoming user registration data."""

    email: EmailStr
    password: str = Field(min_length=8)
    first_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )
    last_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )


class UserLogin(BaseModel):
    """Validate incoming user login credentials."""

    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Serialize user data for API responses."""

    id: UUID
    email: EmailStr
    is_active: bool
    first_name: str | None
    last_name: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LoginResponse(BaseModel):
    """Serialize user token for API response"""

    access_token: str
    token_type: str
