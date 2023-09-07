from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class FavoriteList(db.Model):
    __tablename__ = 'favoritelists'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    user = relationship('User', back_populates='list')
    jobs = relationship('Job', back_populates='list', cascade="all, delete-orphan")

    def to_dict(self):
        job1 = [
            {
                'id': job.id,
                'listId': job.listId,
                'position': job.position,
                'IdNumber': job.IdNumber
                # 'location': job.location,
                # 'description': job.description
            }
            for job in self.jobs
        ]
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name,
            'jobs': job1
        }

