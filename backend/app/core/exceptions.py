"""Custom application exceptions for domain-specific errors."""


class UserAlreadyExistsError(Exception):
    """Raised when attempting to register an existing user."""
