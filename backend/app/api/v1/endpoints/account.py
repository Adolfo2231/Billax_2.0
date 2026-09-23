"""Account API endpoints.

Services return ORM entities. These handlers map them to response schemas
so the annotated return type matches the public JSON contract.
"""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_account_service, get_current_user
from app.models import User
from app.schema import AccountCreate, AccountResponse, AccountUpdate
from app.service import AccountService

router = APIRouter(prefix="/accounts", tags=["Accounts"])


@router.post(
    "/",
    response_model=AccountResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_account(
    current_user: Annotated[User, Depends(get_current_user)],
    account: AccountCreate,
    service: Annotated[AccountService, Depends(get_account_service)],
) -> AccountResponse:
    """Create an account for the authenticated user."""

    created_account = service.create_account(account, current_user.id)
    return AccountResponse.model_validate(created_account)


@router.get(
    "/",
    response_model=list[AccountResponse],
    status_code=status.HTTP_200_OK,
)
def list_accounts(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[AccountService, Depends(get_account_service)],
) -> list[AccountResponse]:
    """Return every account owned by the authenticated user."""

    accounts = service.list_accounts(current_user.id)
    return [AccountResponse.model_validate(account) for account in accounts]


@router.get(
    "/{account_id}",
    response_model=AccountResponse,
    status_code=status.HTTP_200_OK,
)
def get_account(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[AccountService, Depends(get_account_service)],
    account_id: UUID,
) -> AccountResponse:
    """Return an account owned by the authenticated user."""

    account = service.get_account(
        current_user.id,
        account_id,
    )
    return AccountResponse.model_validate(account)


@router.patch(
    "/{account_id}",
    response_model=AccountResponse,
    status_code=status.HTTP_200_OK,
)
def update_account(
    account_id: UUID,
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[AccountService, Depends(get_account_service)],
    account_data: AccountUpdate,
) -> AccountResponse:
    """Update an account owned by the authenticated user."""

    account = service.update_account(
        current_user.id,
        account_id,
        account_data,
    )
    return AccountResponse.model_validate(account)
