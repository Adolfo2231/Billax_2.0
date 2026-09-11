"""FastAPI dependencies for database session management."""

from collections.abc import Generator

from sqlalchemy.orm import Session

from .connection import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """Yield a database session and handle commit, rollback, and cleanup."""
    db = SessionLocal()

    try:
        yield db
        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()
