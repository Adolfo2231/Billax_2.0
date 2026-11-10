from datetime import UTC, datetime
from decimal import Decimal
from types import SimpleNamespace
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.models.transaction import TransactionType
from app.schema import TransactionCreate, TransactionResponse


def test_transaction_create_valid():
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


def test_transaction_create_strips_description():
    transaction = TransactionCreate(
        account_id=uuid4(),
        transaction_type=TransactionType.INCOME,
        amount=Decimal("10.00"),
        transaction_date=datetime.now(UTC),
        description="  bonus  ",
    )

    assert transaction.description == "bonus"


def test_transaction_create_blank_description_becomes_none():
    transaction = TransactionCreate(
        account_id=uuid4(),
        transaction_type=TransactionType.INCOME,
        amount=Decimal("10.00"),
        transaction_date=datetime.now(UTC),
        description="   ",
    )

    assert transaction.description is None


def test_transaction_create_rejects_zero_amount():
    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("0.00"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_negative_amount():
    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("-5.00"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_too_many_decimals():
    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.INCOME,
            amount=Decimal("10.123"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_invalid_type():
    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type="gasto",
            amount=Decimal("10.00"),
            transaction_date=datetime.now(UTC),
        )


def test_transaction_create_rejects_extra_fields():
    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("10.00"),
            transaction_date=datetime.now(UTC),
            user_id=uuid4(),
        )


def test_transaction_create_rejects_naive_transaction_date():
    with pytest.raises(ValidationError):
        TransactionCreate(
            account_id=uuid4(),
            transaction_type=TransactionType.EXPENSE,
            amount=Decimal("10.00"),
            transaction_date=datetime(2026, 11, 10, 15, 0, 0),  # noqa: DTZ001
        )


def test_transaction_response_from_attributes():
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
