"""Transaction API endpoints.

Services return ORM entities. These handlers map them to response schemas
so the annotated return type matches the public JSON contract.
"""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_current_user, get_transaction_service
from app.models import User
from app.schema import TransactionCreate, TransactionResponse, TransactionUpdate
from app.service import TransactionService

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.post(
    "/",
    response_model=TransactionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_transaction(
    current_user: Annotated[User, Depends(get_current_user)],
    transaction: TransactionCreate,
    service: Annotated[TransactionService, Depends(get_transaction_service)],
) -> TransactionResponse:
    """Create a transaction for an account owned by the authenticated user."""

    created_transaction = service.create_transaction(
        transaction,
        current_user.id,
    )
    return TransactionResponse.model_validate(created_transaction)


@router.get(
    "/",
    response_model=list[TransactionResponse],
    status_code=status.HTTP_200_OK,
)
def list_transactions(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[TransactionService, Depends(get_transaction_service)],
) -> list[TransactionResponse]:
    """Return every transaction owned by the authenticated user."""

    transactions = service.list_transactions(current_user.id)
    return [
        TransactionResponse.model_validate(transaction) for transaction in transactions
    ]


@router.get(
    "/{transaction_id}",
    response_model=TransactionResponse,
    status_code=status.HTTP_200_OK,
)
def get_transaction(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[TransactionService, Depends(get_transaction_service)],
    transaction_id: UUID,
) -> TransactionResponse:
    """Return a transaction owned by the authenticated user."""

    transaction = service.get_transaction(
        current_user.id,
        transaction_id,
    )
    return TransactionResponse.model_validate(transaction)


@router.patch(
    "/{transaction_id}",
    response_model=TransactionResponse,
    status_code=status.HTTP_200_OK,
)
def update_transaction(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[TransactionService, Depends(get_transaction_service)],
    transaction_id: UUID,
    transaction_data: TransactionUpdate,
) -> TransactionResponse:
    """Partially update a transaction owned by the authenticated user."""

    transaction = service.update_transaction(
        current_user.id,
        transaction_id,
        transaction_data,
    )
    return TransactionResponse.model_validate(transaction)


@router.delete(
    "/{transaction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_transaction(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[TransactionService, Depends(get_transaction_service)],
    transaction_id: UUID,
) -> None:
    """Soft-delete a transaction owned by the authenticated user."""

    service.delete_transaction(current_user.id, transaction_id)
