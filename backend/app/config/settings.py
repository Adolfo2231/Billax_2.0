"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Define environment-backed settings for the Billax API."""

    app_name: str
    app_version: str
    environment: str
    debug: bool
    database_url: str
    frontend_url: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
