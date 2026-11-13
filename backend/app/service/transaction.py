"""Transaction service layer for transaction-related business logic."""

from uuid import UUID

from app.core.exception import (
    AccountNotFoundError,
    CategoryNotFoundError,
    TransactionNotFoundError,
)
from app.models import Transaction
from app.repositories import (
    AccountRepository,
    CategoryRepository,
    TransactionRepository,
)
from app.schema import TransactionCreate, TransactionUpdate


class TransactionService:
    """Coordinate transaction creation while enforcing account ownership."""

    def __init__(
        self,
        transaction_repository: TransactionRepository,
        account_repository: AccountRepository,
        category_repository: CategoryRepository,
    ) -> None:
        """Initialize the service with transaction, account, and category repos."""

        self.transaction_repository = transaction_repository
        self.account_repository = account_repository
        self.category_repository = category_repository

    def _require_owned_active_category(
        self,
        user_id: UUID,
        category_id: UUID,
    ) -> None:
        """Raise when the category is missing, foreign, or inactive."""

        category = self.category_repository.get_category_by_id(user_id, category_id)

        if category is None:
            raise CategoryNotFoundError()

    def create_transaction(
        self,
        transaction_data: TransactionCreate,
        user_id: UUID,
    ) -> Transaction:
        """Create a transaction on an account owned by the authenticated user."""

        account = self.account_repository.get_account_by_id(
            user_id,
            transaction_data.account_id,
        )

        if account is None:
            raise AccountNotFoundError()

        if transaction_data.category_id is not None:
            self._require_owned_active_category(user_id, transaction_data.category_id)

        new_transaction = Transaction(**transaction_data.model_dump())

        return self.transaction_repository.create(new_transaction)

    def list_transactions(self, user_id: UUID) -> list[Transaction]:
        """Return all transactions for accounts owned by the specified user."""

        return self.transaction_repository.get_all_by_user_id(user_id)

    def get_transaction(self, user_id: UUID, transaction_id: UUID) -> Transaction:
        """Return an owned transaction or raise when it cannot be found."""

        transaction = self.transaction_repository.get_transaction_by_id(
            user_id,
            transaction_id,
        )

        if transaction is None:
            raise TransactionNotFoundError()

        return transaction

    def update_transaction(
        self,
        user_id: UUID,
        transaction_id: UUID,
        transaction_data: TransactionUpdate,
    ) -> Transaction:
        """Update an owned transaction with only the fields that were sent."""

        transaction = self.transaction_repository.get_transaction_by_id(
            user_id,
            transaction_id,
        )

        if transaction is None:
            raise TransactionNotFoundError()

        update_data = transaction_data.model_dump(exclude_unset=True)

        category_id = update_data.get("category_id")
        if category_id is not None:
            self._require_owned_active_category(user_id, category_id)

        for key, value in update_data.items():
            setattr(transaction, key, value)

        return self.transaction_repository.update(transaction)

    def delete_transaction(self, user_id: UUID, transaction_id: UUID) -> None:
        """Soft-delete an owned transaction, or raise when it cannot be found."""

        transaction = self.transaction_repository.get_transaction_by_id(
            user_id,
            transaction_id,
        )

        if transaction is None:
            raise TransactionNotFoundError()

        transaction.is_active = False
        self.transaction_repository.update(transaction)
