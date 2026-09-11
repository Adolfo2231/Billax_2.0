"""User service layer for handling user-related business logic."""

from uuid import UUID

from jose import JWTError

from app.core import create_access_token, decode_access_token
from app.core.exceptions import AuthenticationError, UserAlreadyExistsError
from app.core.security import hash_password, verify_password
from app.models import User
from app.repositories.user import UserRepository
from app.schema import LoginResponse, UserLogin, UserRegister


class UserService:
    """Handle user-related business rules."""

    def __init__(self, user_repository: UserRepository):
        """Initialize the service with a user repository dependency."""

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

        return self.user_repository.create(user)

    def authenticate_user(self, user_data: UserLogin) -> User | None:
        """Authenticate a user and return the user if successful."""

        user = self.user_repository.get_by_email(user_data.email)

        if user is None or not user.is_active:
            return None

        if not verify_password(user_data.password, user.password_hash):
            return None

        return user

    def get_user_from_access_token(self, token: str) -> User:
        """Validate an access token and return its active user."""

        try:
            subject = decode_access_token(token)
            user_id = UUID(subject)

        except (ValueError, JWTError):
            raise AuthenticationError() from None

        user = self.user_repository.get_by_id(user_id)

        if user is None or not user.is_active:
            raise AuthenticationError()

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
