"""Account API endpoints."""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_account_service, get_current_user
from app.models import Account, User
from app.schema import AccountCreate, AccountResponse
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
) -> Account:
    """Create an account for the authenticated user."""

    return service.create_account(account, current_user.id)


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

    return service.list_accounts(current_user.id)


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

    return service.get_account(
        current_user.id,
        account_id,
    )
