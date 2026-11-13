"""add unique index on category user_id lower name

Revision ID: 4be19c393401
Revises: 74095d614833
Create Date: 2026-11-12 23:29:33.935471

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4be19c393401'
down_revision: Union[str, Sequence[str], None] = '74095d614833'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_index(
        'ix_categories_user_id_name_lower',
        'categories',
        ['user_id', sa.literal_column('lower(name)')],
        unique=True,
        postgresql_where=sa.text('is_active'),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(
        'ix_categories_user_id_name_lower',
        table_name='categories',
        postgresql_where=sa.text('is_active'),
    )
