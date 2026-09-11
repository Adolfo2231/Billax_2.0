"""initial

Revision ID: 12d42cd4bbd0
Revises:
Create Date: 2026-08-12 19:10:04.166149

"""

from collections.abc import Sequence

# revision identifiers, used by Alembic.
revision: str = "12d42cd4bbd0"
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""


def downgrade() -> None:
    """Downgrade schema."""
