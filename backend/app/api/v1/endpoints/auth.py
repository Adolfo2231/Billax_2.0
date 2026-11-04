"""Authentication API endpoints for user registration and login.

Services return ORM entities. These handlers map them to response schemas
so the annotated return type matches the public JSON contract.
"""

from typing import Annotated

from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.v1.dependencies import get_current_user, get_user_service
from app.models import User
from app.schema import LoginResponse, UserRegister, UserResponse
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
    """Register a new user and return the public user payload."""

    user = service.register(user_data)
    return UserResponse.model_validate(user)


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
)
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    service: Annotated[UserService, Depends(get_user_service)],
) -> LoginResponse:
    """Login a user using OAuth2 form credentials."""

    return service.login(form_data.username, form_data.password)


@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
)
def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> UserResponse:
    """Return the current user's public profile."""

    return UserResponse.model_validate(current_user)
