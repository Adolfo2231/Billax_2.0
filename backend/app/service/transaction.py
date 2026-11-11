"""Transaction service layer for transaction-related business logic."""

from uuid import UUID

from app.core.exception import AccountNotFoundError
from app.models import Transaction
from app.repositories import AccountRepository, TransactionRepository
from app.schema import TransactionCreate


class TransactionService:
    """Coordinate transaction creation while enforcing account ownership."""

    def __init__(
        self,
        transaction_repository: TransactionRepository,
        account_repository: AccountRepository,
    ) -> None:
        """Initialize the service with transaction and account repositories."""

        self.transaction_repository = transaction_repository
        self.account_repository = account_repository

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

        new_transaction = Transaction(**transaction_data.model_dump())

        return self.transaction_repository.create(new_transaction)
