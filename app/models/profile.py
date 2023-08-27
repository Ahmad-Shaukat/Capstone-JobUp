from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey
from flask_login import UserMixin
from datetime import datetime


class Profile (db.Model):
    __tablename__ = 'profiles'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    first_name = db.Column(db.String(100), default='')
    last_name = db.Column(db.String(100), default='')
    career = db.Column(db.String(150), default='')
    location = db.Column(db.String(100), default='')
    bio = db.Column(db.String(1000), default='')

    user = relationship('User', back_populates='profile')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'career': self.career,
            'location': self.location,
            'bio': self.bio
        }
