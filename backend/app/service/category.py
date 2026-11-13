"""Category service layer for category-related business logic."""

from uuid import UUID

from app.core.exception import CategoryNotFoundError
from app.models import Category
from app.repositories import CategoryRepository
from app.schema import CategoryCreate, CategoryUpdate


class CategoryService:
    """Coordinate category operations while enforcing ownership rules."""

    def __init__(self, category_repository: CategoryRepository) -> None:
        """Initialize the service with a category repository."""

        self.category_repository = category_repository

    def create_category(self, category: CategoryCreate, user_id: UUID) -> Category:
        """Create and return a category owned by the specified user."""

        new_category = Category(
            user_id=user_id,
            **category.model_dump(),
        )

        return self.category_repository.create(new_category)

    def list_categories(self, user_id: UUID) -> list[Category]:
        """Return all active categories owned by the specified user."""

        return self.category_repository.get_all_by_user_id(user_id)

    def get_category(self, user_id: UUID, category_id: UUID) -> Category:
        """Return an owned category or raise when it cannot be found."""

        category = self.category_repository.get_category_by_id(user_id, category_id)

        if category is None:
            raise CategoryNotFoundError()

        return category

    def update_category(
        self,
        user_id: UUID,
        category_id: UUID,
        category_data: CategoryUpdate,
    ) -> Category:
        """Update an owned category with only the fields that were sent."""

        category = self.category_repository.get_category_by_id(user_id, category_id)

        if category is None:
            raise CategoryNotFoundError()

        update_data = category_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(category, key, value)

        return self.category_repository.update(category)

    def deactivate_category(self, user_id: UUID, category_id: UUID) -> None:
        """Soft-delete an owned category, or raise when it cannot be found."""

        category = self.category_repository.get_category_by_id(user_id, category_id)

        if category is None:
            raise CategoryNotFoundError()

        category.is_active = False
        self.category_repository.update(category)
