from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Comment(db.Model):
    __tablename__='comments'

    if environment == 'production':
        __table_args__ = {'Schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    interviewId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('interviews.id')), nullable=False, unique=True)
    comment = db.Column(db.String(500), nullable=False)

    user = relationship("User", back_populates='comment')
    interview= relationship('Interview',back_populates='comment')
