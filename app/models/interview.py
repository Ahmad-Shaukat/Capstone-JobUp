from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Interview(db.Model):
    __tablename__ = "interviews"

    if environment == "production": 
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    company = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String, nullable=False)
    date = db.Column(db.Date)

    user = relationship("User", back_populates="interview")
    comment = relationship('Comment', back_populates='interview', cascade="all, delete-orphan")

    def to_dict(self):
        # comments1 = [
        #         {
        #             'id': com.id,
        #             'userId': com.userId,
        #             'interviewId': com.interviewId,
        #             'comment': com.comment
        #         }
        #         for com in self.comment
        # ]
        
        comments_data = []
        for comm in self.comment: 
            comment_data = {
                'id': comm.id,
                'userId': comm.userId,
                'interviewId': comm.interviewId,
                'comment': comm.comment,
                'created_at': comm.created_at
            }
            user_info = comm.user.to_dict()
            comment_data['user'] = user_info
            comments_data.append(comment_data)
        return {
            'id': self.id,
            'userId': self.userId,
            'position': self.position,
            'company': self.company,
            'location': self.location,
            'status': self.status,
            'date': self.date,
            'comments': comments_data
        }


