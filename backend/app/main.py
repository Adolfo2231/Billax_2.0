"""
Main entry point for the Billax 2.0 API.

This module initializes the FastAPI application.
"""

from fastapi import FastAPI

from app.config.settings import settings

app = FastAPI(title=settings.app_name, version=settings.app_version)


@app.get("/")
def root():
    return {"message": "Billax 2.0 API running"}
