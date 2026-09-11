from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_account_service, get_current_user
from app.models import User
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
):
    return service.create_account(account, current_user.id)
