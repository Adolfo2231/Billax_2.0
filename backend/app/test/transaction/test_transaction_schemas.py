"""Unit tests for transaction create and response Pydantic schemas.

Cover valid payloads, description normalization, amount and type
validation, timezone-aware dates, and ORM-style response mapping.
"""

from datetime import UTC, datetime
from decimal import Decimal
from types import SimpleNamespace
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.models.transaction import TransactionType
from app.schema import TransactionCreate, TransactionResponse


def test_transaction_create_valid():
    """Verify that a valid create payload accepts owned fields only."""

    account_id = uuid4()
    when = datetime.now(UTC)

    transaction = TransactionCreate(
        account_id=account_id,
        transaction_type=TransactionType.EXPENSE,
        amount=Decimal("50.00"),
        transaction_date=when,
        description="Café",
    )

    assert transaction.account_id == account_id
    assert transaction.transaction_type == TransactionType.EXPENSE
    assert transaction.amount == Decimal("50.00")
    assert transaction.transaction_date == when
    assert transaction.category_id is None
    assert transaction.description == "Café"


def test_transaction_create_from_json_payload():
    """Accept expense type, decimal string, and ISO date with Z from JSON."""

    account_id = uuid4()

    transaction = TransactionCreate.model_validate(
        {
            "account_id": str(account_id),
            "transaction_type": "expense",
            "amount": "50.00",
            "transaction_date": "2026-11-10T15:00:00Z",
        }
    )

    assert transaction.account_id == account_id
    assert transaction.transaction_type == TransactionType.EXPENSE
    assert transaction.amount == Decimal("50.00")
    assert transaction.transaction_date == datetime(2026, 11, 10, 15, 0, 0, tzinfo=UTC)
    assert transaction.category_id is None
    assert transaction.description is None


def test_transaction_create_strips_description():
    """Strip surrounding whitespace from description before storage."""

    transaction = TransactionCreate(
        account_id=uuid4(),
        transaction_type=TransactionType.INCOME,
        amount=Decimal("10.00"),
        transaction_date=datetime.now(UTC),
        description="  bonus  ",
    )

    assert transaction.description == "bonus"


def test_transaction_create_blank_description_becomes_none():
    """Normalize blank descriptions to None after whitespace strip."""

    transaction = TransactionCreate(
        account_id=uuid4(),
        transaction_type=TransactionType.INCOME,
        amount=Decimal("10.00"),
        transaction_date=datetime.now(UTC),
        description="   ",
    )

    assert transaction.description is None


def test_transaction_create_rejects_zero_amount():
    """Reject a zero amount on create."""

    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("0.00"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_negative_amount():
    """Reject a negative amount on create."""

    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("-5.00"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_too_many_decimals():
    """Reject amounts with more than two decimal places."""

    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.INCOME,
            amount=Decimal("10.123"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_invalid_type():
    """Reject a transaction_type outside the allowed enum values."""

    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type="gasto",
            amount=Decimal("10.00"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_extra_fields():
    """Reject client-owned create payloads that include unexpected fields."""

    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("10.00"),
            transaction_date=datetime.now(UTC),
            user_id=uuid4(),
        )


def test_transaction_create_rejects_category_id():
    """Reject category_id until Categories CRUD is available."""

    with pytest.raises(ValidationError) as exc_info:
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("10.00"),
            transaction_date=datetime.now(UTC),
            category_id=uuid4(),
        )

    assert "category_id is not supported yet" in str(exc_info.value)


def test_transaction_create_rejects_naive_transaction_date():
    """Reject a transaction_date without timezone information."""

    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("10.00"),
            transaction_date=datetime(2026, 11, 10, 15, 0, 0),  # noqa: DTZ001
        )


def test_transaction_response_from_attributes():
    """Map ORM-like attributes into the public response schema."""

    now = datetime.now(UTC)
    account_id = uuid4()
    transaction_id = uuid4()

    transaction_object = SimpleNamespace(
        id=transaction_id,
        account_id=account_id,
        category_id=None,
        transaction_type=TransactionType.INCOME,
        amount=Decimal("100.00"),
        transaction_date=now,
        description="Paycheck",
        is_active=True,
        created_at=now,
        updated_at=now,
    )

    response = TransactionResponse.model_validate(transaction_object)

    assert response.id == transaction_id
    assert response.account_id == account_id
    assert response.amount == Decimal("100.00")
    assert response.is_active is True
    assert response.description == "Paycheck"


def test_transaction_response_allows_long_description():
    """Serialize a description longer than the create max_length without error."""

    now = datetime.now(UTC)
    long_description = "x" * 300

    response = TransactionResponse.model_validate(
        SimpleNamespace(
            id=uuid4(),
            account_id=uuid4(),
            category_id=None,
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("10.00"),
            transaction_date=now,
            description=long_description,
            is_active=True,
            created_at=now,
            updated_at=now,
        )
    )

    assert response.description == long_description
