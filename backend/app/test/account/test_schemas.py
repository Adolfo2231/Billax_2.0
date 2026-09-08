from datetime import UTC, datetime
from decimal import Decimal
from types import SimpleNamespace
from uuid import uuid4

import pytest
from pydantic import ValidationError

from app.models import AccountType
from app.schema import AccountCreate, AccountResponse, AccountUpdate


def test_account_create_valid():
    account = AccountCreate(
        name="Checking Account",
        account_type=AccountType.CHECKING,
        balance=Decimal("150.00"),
    )

    assert account.name == "Checking Account"
    assert account.account_type == AccountType.CHECKING
    assert account.balance == Decimal("150.00")


def test_account_create_default_balance():
    account = AccountCreate(
        name="Cash",
        account_type=AccountType.CASH,
    )

    assert account.balance == Decimal("0.00")


def test_account_create_invalid_type():
    with pytest.raises(ValidationError):
        AccountCreate(
            name="Test",
            account_type="crypto",
        )


def test_account_update_partial():
    account = AccountUpdate(name="Emergency Fund")

    assert account.name == "Emergency Fund"
    assert account.account_type is None
    assert account.balance is None
    assert account.is_active is None


def test_account_response_from_attributes():
    now = datetime.now(UTC)

    account_object = SimpleNamespace(
        id=uuid4(),
        user_id=uuid4(),
        name="Savings",
        account_type=AccountType.SAVINGS,
        balance=Decimal("500.00"),
        is_active=True,
        created_at=now,
        updated_at=now,
    )

    response = AccountResponse.model_validate(account_object)

    assert response.name == "Savings"
    assert response.balance == Decimal("500.00")
    assert response.is_active is True
