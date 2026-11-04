"""Account-specific domain exceptions."""


class AccountNotFoundError(Exception):
    """Raised when an account is missing or not owned by the requesting user."""

    def __init__(self, message: str = "Account not found") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)
