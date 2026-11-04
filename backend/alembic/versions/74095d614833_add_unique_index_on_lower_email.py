"""add unique index on lower email

Revision ID: 74095d614833
Revises: bef8a80fe80e
Create Date: 2026-09-30 18:37:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '74095d614833'
down_revision: Union[str, Sequence[str], None] = 'bef8a80fe80e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_index(
        'ix_users_email_lower',
        'users',
        [sa.literal_column('lower(email)')],
        unique=True,
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_users_email_lower', table_name='users')
