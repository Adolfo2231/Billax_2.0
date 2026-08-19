"""FastAPI application entry point for the Billax 2.0 API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.exception_handler import register_exception_handlers
from app.api.v1.router import api_router
from app.config.settings import settings

app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(
    api_router,
    prefix="/api/v1",
)


@app.get("/")
def root() -> dict:
    """Return a health check message for the running API."""

    return {"message": "Billax 2.0 API running"}
