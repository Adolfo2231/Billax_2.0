"""Custom application exceptions for domain-specific errors."""


class UserAlreadyExistsError(Exception):
    """Raised when attempting to register an existing user."""

    def __init__(self, message: str = "Email already exist") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)


class AuthenticationError(Exception):
    """Raised when user authentication fails."""

    def __init__(self, message: str = "Invalid credentials") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)


class LongPasswordError(Exception):
    """Raised when the password exceeds 72 bytes."""

    def __init__(self, message: str = "Password too long") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)
