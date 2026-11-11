"""FastAPI dependencies for injecting services and repositories."""

from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models import User
from app.repositories import AccountRepository, TransactionRepository, UserRepository
from app.service import AccountService, TransactionService, UserService

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
)


def get_user_service(
    db: Annotated[Session, Depends(get_db)],
) -> UserService:
    """Provide a UserService instance wired with a database session."""
    repository = UserRepository(db)

    return UserService(repository)


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    service: Annotated[UserService, Depends(get_user_service)],
) -> User:
    """Return the authenticated user from the Bearer access token."""

    return service.get_user_from_access_token(token)


def get_account_service(
    db: Annotated[Session, Depends(get_db)],
) -> AccountService:
    """Provide an AccountService instance wired with a database session."""

    repository = AccountRepository(db)

    return AccountService(repository)


def get_transaction_service(
    db: Annotated[Session, Depends(get_db)],
) -> TransactionService:
    """Provide a TransactionService with transaction and account repositories."""

    transaction_repository = TransactionRepository(db)
    account_repository = AccountRepository(db)

    return TransactionService(transaction_repository, account_repository)
