"""User service layer for handling user-related business logic."""

from app.core import create_access_token
from app.core.exceptions import AuthenticationError, UserAlreadyExistsError
from app.core.security import hash_password, verify_password
from app.models import User
from app.repositories.user import UserRepository
from app.schema import LoginResponse, UserLogin, UserRegister


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

    def authenticate_user(self, user_data: UserLogin) -> User | None:
        """Authenticate a user and return the user if successful."""

        user = self.user_repository.get_by_email(user_data.email)

        if user is None:
            return None

        if not verify_password(user_data.password, user.password_hash):
            return None

        return user

    def login(self, user_data: UserLogin) -> LoginResponse:
        """Login a user and return the access token."""

        user = self.authenticate_user(user_data)

        if user is None:
            raise AuthenticationError()

        access_token = create_access_token(str(user.id))

        return LoginResponse(
            access_token=access_token,
            token_type="bearer",
        )
