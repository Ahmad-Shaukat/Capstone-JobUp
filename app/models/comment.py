from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from datetime import datetime

class Comment(db.Model):
    __tablename__='comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    interviewId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('interviews.id')), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    user = relationship("User", back_populates='comment')
    interview= relationship('Interview',back_populates='comment')

    def to_dict(self):
        return {
            'id':self.id,
            'UserId': self.userId,
            'comment': self.comment,
            'created_at': self.created_at
        }
