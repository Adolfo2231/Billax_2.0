"""Authentication API endpoints for user registration and login."""

from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_user_service
from app.schema import UserRegister, UserResponse
from app.service.user import UserService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user_data: UserRegister,
    service: Annotated[UserService, Depends(get_user_service)],
) -> UserResponse:
    """Register a new user and return the created user data."""
    return service.register(user_data)
