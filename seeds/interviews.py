from app.models import db, Interview, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_interviews():

    test_date_str = '2023-05-10'
    test_date = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str1 = '2023-02-10'
    test_date1 = datetime.strptime(test_date_str1, "%Y-%m-%d").date()
    

    interview1 = Interview(
        userId=1,
        position='Software Engineer',
        company="Amazon",
        location='New York',
        status='Pending',
        date=test_date

    )
    interview2 = Interview(
        userId=1,
        position='Front-end Engineer',
        company="Chase",
        location='New York',
        status='Scheduled',
        date=test_date1

    )
    db.session.add(interview1)
    db.session.add(interview2)
    db.session.commit()

def undo_interviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.interviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text('DELETE FROM interviews'))
    db.session.commit()

