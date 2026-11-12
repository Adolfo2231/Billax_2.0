"""Unit tests for category create, update, and response Pydantic schemas."""

from datetime import UTC, datetime
from types import SimpleNamespace
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.schema import CategoryCreate, CategoryResponse, CategoryUpdate


def test_category_create_valid():
    """Accept a non-empty name and strip surrounding whitespace."""

    category = CategoryCreate(name="  Food  ")

    assert category.name == "Food"


def test_category_create_rejects_blank_name():
    """Reject empty or whitespace-only names after strip."""

    with pytest.raises(ValidationError):
        CategoryCreate(name="   ")


def test_category_create_rejects_extra_fields():
    """Reject unexpected fields on create payloads."""

    with pytest.raises(ValidationError):
        CategoryCreate(name="Food", user_id=uuid4())


def test_category_update_rejects_explicit_null_name():
    """Reject JSON null for name; omitted fields remain optional."""

    with pytest.raises(ValidationError):
        CategoryUpdate.model_validate({"name": None})


def test_category_response_from_attributes():
    """Build CategoryResponse from ORM-style attributes without user_id."""

    now = datetime.now(UTC)
    category_id = uuid4()

    category_object = SimpleNamespace(
        id=category_id,
        user_id=uuid4(),
        name="Transport",
        is_active=True,
        created_at=now,
        updated_at=now,
    )

    response = CategoryResponse.model_validate(category_object)

    assert response.id == category_id
    assert response.name == "Transport"
    assert response.is_active is True
    assert response.created_at == now
    assert response.updated_at == now
    assert not hasattr(response, "user_id")
