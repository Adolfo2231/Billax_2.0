"""Transaction-specific domain exceptions."""


class TransactionNotFoundError(Exception):
    """Raised when a transaction is missing or not owned by the requesting user."""

    def __init__(self, message: str = "Transaction not found") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)
