from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Job(db.Models):
    __tablename__='jobs'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("favoritelists.id")), nullable=False, unique=True)
    position=db.Column(db.String(50), nullable=False)
    location=db.Column(db.String(50), nullable=False)
    description=db.Column(db.String(500), nullable=False)

    list = relationship('FavoriteList', back_populates='job')



