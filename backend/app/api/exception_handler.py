"""Global API exception handlers."""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.core.exception import (
    AccountNotFoundError,
    AuthenticationError,
    CategoryAlreadyExistsError,
    CategoryNotFoundError,
    LongPasswordError,
    TransactionNotFoundError,
    UserAlreadyExistsError,
)


async def account_not_found_handler(
    request: Request,
    exc: AccountNotFoundError,
) -> JSONResponse:
    """Return a 404 response when an owned account cannot be found."""

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": exc.message},
    )


async def category_not_found_handler(
    request: Request,
    exc: CategoryNotFoundError,
) -> JSONResponse:
    """Return a 404 response when an owned category cannot be found."""

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": exc.message},
    )


async def transaction_not_found_handler(
    request: Request,
    exc: TransactionNotFoundError,
) -> JSONResponse:
    """Return a 404 response when an owned transaction cannot be found."""

    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": exc.message},
    )


async def conflict_error_handler(
    request: Request,
    exc: UserAlreadyExistsError | CategoryAlreadyExistsError,
) -> JSONResponse:
    """Return a 409 response when a unique resource already exists."""
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={"detail": exc.message},
    )


async def authentication_error_handler(
    request: Request,
    exc: AuthenticationError,
) -> JSONResponse:
    """Return a 401 response when a user is unauthorized."""

    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={"detail": exc.message},
    )


async def long_password_error_handler(
    request: Request,
    exc: LongPasswordError,
) -> JSONResponse:
    """Return a 422 response when the password exceeds bcrypt's 72-byte limit."""

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
        content={"detail": exc.message},
    )


def register_exception_handlers(app: FastAPI) -> None:
    """Register global exception handlers on the FastAPI app."""

    app.add_exception_handler(
        AccountNotFoundError,
        account_not_found_handler,
    )
    app.add_exception_handler(
        CategoryNotFoundError,
        category_not_found_handler,
    )
    app.add_exception_handler(
        TransactionNotFoundError,
        transaction_not_found_handler,
    )
    app.add_exception_handler(
        UserAlreadyExistsError,
        conflict_error_handler,
    )
    app.add_exception_handler(
        CategoryAlreadyExistsError,
        conflict_error_handler,
    )

    app.add_exception_handler(
        AuthenticationError,
        authentication_error_handler,
    )

    app.add_exception_handler(
        LongPasswordError,
        long_password_error_handler,
    )
