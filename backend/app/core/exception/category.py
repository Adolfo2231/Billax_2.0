"""Category-specific domain exceptions."""


class CategoryNotFoundError(Exception):
    """Raised when a category is missing or not owned by the requesting user."""

    def __init__(self, message: str = "Category not found") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)


class CategoryAlreadyExistsError(Exception):
    """Raised when a user already has a category with the same name."""

    def __init__(self, message: str = "Category already exists") -> None:
        """Initialize the exception with a safe client-facing message."""

        self.message = message
        super().__init__(message)
