"""User service layer for handling user-related business logic."""

from app.core.exceptions import UserAlreadyExistsError
from app.core.security import hash_password
from app.models import User
from app.repositories.user import UserRepository
from app.schema import UserRegister


class UserService:
    """Handle user-related business rules."""

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def register(self, user_data: UserRegister) -> User:
        """Register a new user after validating email uniqueness."""
        exist_user = self.user_repository.get_by_email(user_data.email)

        if exist_user is not None:
            raise UserAlreadyExistsError()

        password_hash = hash_password(user_data.password)

        user = User(
            **user_data.model_dump(exclude={"password"}),
            password_hash=password_hash,
        )

        return self.user_repository.create_user(user)
