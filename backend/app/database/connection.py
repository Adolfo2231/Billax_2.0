"""SQLAlchemy engine and session factory for database access."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config.settings import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(bind=engine)
