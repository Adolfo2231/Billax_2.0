"""API v1 router aggregating all versioned endpoints."""

from fastapi import APIRouter

from app.api.v1.endpoints.account import router as account_router
from app.api.v1.endpoints.auth import router as auth_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(account_router)
