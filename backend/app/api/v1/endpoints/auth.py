"""Authentication API endpoints for user registration and login."""

from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.v1.dependencies import get_current_user, get_user_service
from app.models import User
from app.schema import LoginResponse, UserLogin, UserRegister, UserResponse
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


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
)
def login(
    user_data: UserLogin,
    service: Annotated[UserService, Depends(get_user_service)],
) -> LoginResponse:
    """Login a user and return the access token."""
    return service.login(user_data)


@router.get("/me", response_model=UserResponse)
def get_me(current_user: Annotated[User, Depends(get_current_user)]) -> UserResponse:
    """Get the current user's profile."""
    return current_user
