"""Custom application exceptions for domain-specific errors."""


class UserAlreadyExistsError(Exception):
    """Raised when attempting to register an existing user."""

    def __init__(self, message: str = "Email already exist") -> None:
        self.message = message
        super().__init__(message)


class AuthenticationError(Exception):
    """Raised when user authentication fails."""

    def __init__(self, message: str = "Invalid Credentials") -> None:
        self.message = message
        super().__init__(message)
