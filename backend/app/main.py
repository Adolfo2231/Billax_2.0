"""
Main entry point for the Billax 2.0 API.

This module initializes the FastAPI application.
"""

from fastapi import FastAPI

app = FastAPI(title="Billax 2.0 API", version="0.1.0")


@app.get("/")
def root():
    return {"message": "Billax 2.0 API running"}
