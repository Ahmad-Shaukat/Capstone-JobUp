from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Interview(db.Model):
    __tablename__ = "account"

    if environment == "production": 
        __table_args__ = {'schema': SCHEMA}
    id = db.column(db.integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("user.id")), nullable=False, unique=True)
    position = db.Column(db.String(50), nullable=False)
    company = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String, nullable=False)
    date = db.Column(db.Date)

    user = relationship("User", back_populates="interview")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'position': self.position,
            'company': self.company,
            'location': self.location,
            'status': self.status,
            'date': self.date
        }


