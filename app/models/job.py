from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Job(db.Model):
    __tablename__='jobs'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    listId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("favoritelists.id")), nullable=False)
    title=db.Column(db.String(50), nullable=False)
    # location=db.Column(db.String(50), nullable=False)
    # description=db.Column(db.String(1000), nullable=False)
    url = db.Column(db.String, nullable=False)
    IdNumber = db.Column(db.Integer, nullable = False)

    list = relationship('FavoriteList', back_populates='jobs')

    def to_dict (self):
        return {
            'id': self.id,
            'listId': self.listId, 
            'title': self.position,
            'IdNumber': self.IdNumber,
            'url': self.url
            # 'description': self.description
        }




