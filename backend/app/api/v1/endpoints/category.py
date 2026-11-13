"""Category API endpoints.

Services return ORM entities. These handlers map them to response schemas
so the annotated return type matches the public JSON contract.
"""

from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_category_service, get_current_user
from app.models import User
from app.schema import CategoryCreate, CategoryResponse, CategoryUpdate
from app.service import CategoryService

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    current_user: Annotated[User, Depends(get_current_user)],
    category: CategoryCreate,
    service: Annotated[CategoryService, Depends(get_category_service)],
) -> CategoryResponse:
    """Create a category for the authenticated user."""

    created_category = service.create_category(category, current_user.id)
    return CategoryResponse.model_validate(created_category)


@router.get(
    "/",
    response_model=list[CategoryResponse],
    status_code=status.HTTP_200_OK,
)
def list_categories(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[CategoryService, Depends(get_category_service)],
) -> list[CategoryResponse]:
    """Return every active category owned by the authenticated user."""

    categories = service.list_categories(current_user.id)
    return [CategoryResponse.model_validate(category) for category in categories]


@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
    status_code=status.HTTP_200_OK,
)
def get_category(
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[CategoryService, Depends(get_category_service)],
    category_id: UUID,
) -> CategoryResponse:
    """Return a category owned by the authenticated user."""

    category = service.get_category(
        current_user.id,
        category_id,
    )
    return CategoryResponse.model_validate(category)


@router.patch(
    "/{category_id}",
    response_model=CategoryResponse,
    status_code=status.HTTP_200_OK,
)
def update_category(
    category_id: UUID,
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[CategoryService, Depends(get_category_service)],
    category_data: CategoryUpdate,
) -> CategoryResponse:
    """Update a category owned by the authenticated user."""

    category = service.update_category(
        current_user.id,
        category_id,
        category_data,
    )
    return CategoryResponse.model_validate(category)


@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def deactivate_category(
    category_id: UUID,
    current_user: Annotated[User, Depends(get_current_user)],
    service: Annotated[CategoryService, Depends(get_category_service)],
) -> None:
    """Soft-delete a category owned by the authenticated user."""

    service.deactivate_category(current_user.id, category_id)
