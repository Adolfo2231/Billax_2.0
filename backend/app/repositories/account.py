from sqlalchemy.orm import Session

from app.models import Account

from .base import BaseRepository


class AccountRepository(BaseRepository[Account]):
    def __init__(self, db: Session):
        super().__init__(db=db, model=Account)
