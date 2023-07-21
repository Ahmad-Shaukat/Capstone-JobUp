from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class FavoriteList(db.Model):
    __tablename__ = 'favoritelists'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.integer, primary_key=True)
    userId = db.Column(db.integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False)

    user = relationship('User', back_populates='list')
    job = relationship('Job', back_populates='list', cascade="all, delete-orphan")

