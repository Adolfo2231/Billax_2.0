from uuid import UUID

from app.models import Account
from app.repositories import AccountRepository
from app.schema import AccountCreate


class AccountService:
    def __init__(self, account_repository: AccountRepository):
        self.account_repository = account_repository

    def create_account(self, account: AccountCreate, user_id: UUID) -> Account:

        new_account = Account(
            user_id=user_id,
            **account.model_dump(),
        )

        return self.account_repository.create(new_account)
