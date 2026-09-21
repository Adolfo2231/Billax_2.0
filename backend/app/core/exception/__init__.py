"""Public exports for application domain exceptions."""

from .account import AccountNotFoundError
from .auth import AuthenticationError, UserAlreadyExistsError

__all__ = [
    "AccountNotFoundError",
    "AuthenticationError",
    "UserAlreadyExistsError",
]
