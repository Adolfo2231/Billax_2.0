"""Account service layer for account-related business logic."""

from uuid import UUID

from app.core.exception import AccountNotFoundError
from app.models import Account
from app.repositories import AccountRepository
from app.schema import AccountCreate, AccountUpdate


class AccountService:
    """Coordinate account operations while enforcing ownership rules."""

    def __init__(self, account_repository: AccountRepository) -> None:
        """Initialize the service with an account repository."""

        self.account_repository = account_repository

    def create_account(self, account: AccountCreate, user_id: UUID) -> Account:
        """Create and return an account owned by the specified user."""

        new_account = Account(
            user_id=user_id,
            **account.model_dump(),
        )

        return self.account_repository.create(new_account)

    def list_accounts(self, user_id: UUID) -> list[Account]:
        """Return all accounts owned by the specified user."""

        return self.account_repository.get_all_by_user_id(user_id)

    def get_account(self, user_id: UUID, account_id: UUID) -> Account:
        """Return an owned account or raise when it cannot be found."""

        account = self.account_repository.get_account_by_id(user_id, account_id)

        if not account:
            raise AccountNotFoundError()

        return account

    def update_account(
        self, user_id: UUID, account_id: UUID, account_data: AccountUpdate
    ) -> Account:
        """Update an owned account with only the fields that were sent."""

        account = self.account_repository.get_account_by_id(user_id, account_id)

        if account is None:
            raise AccountNotFoundError()

        update_data = account_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(account, key, value)

        return self.account_repository.update(account)
