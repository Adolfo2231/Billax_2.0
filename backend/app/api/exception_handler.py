"""Global API exception handlers."""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.core.exceptions import AuthenticationError, UserAlreadyExistsError


async def user_already_exists_handler(
    request: Request,
    exc: UserAlreadyExistsError,
) -> JSONResponse:
    """Return a 409 response when registration email already exists."""
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={"detail": exc.message},
    )


async def authentication_error_handler(
    request: Request,
    exc: AuthenticationError,
) -> JSONResponse:
    """Return a 401 response when user is unautorized"""
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={"detail": exc.message},
    )


def register_exception_handlers(app: FastAPI) -> None:
    """Register global exception handlers on the FastAPI app."""

    app.add_exception_handler(
        UserAlreadyExistsError,
        user_already_exists_handler,
    )

    app.add_exception_handler(
        AuthenticationError,
        authentication_error_handler,
    )
