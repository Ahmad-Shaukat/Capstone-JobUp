from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    comment1 = Comment(
        userId = 1, 
        interviewId = 1,
        comment = 'Good luck in the interview'
    )
    comment2 = Comment (
        userId = 1, 
        interviewId = 2, 
        comment = 'hey i know this company'
    )
    comment3 = Comment(
        userId = 3,
        interviewId = 1,
        comment='I hate this company'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfoliotransactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    db.session.commit()