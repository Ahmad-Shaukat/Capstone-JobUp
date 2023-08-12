from app.models import db, Interview, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_interviews():

    test_date_str = '2023-12-10'
    test_date = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str1 = '2023-11-10'
    test_date1 = datetime.strptime(test_date_str1, "%Y-%m-%d").date()
    test_date_str2 = '2023-12-02'
    test_date2 = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str3 = '2023-12-15'
    test_date3 = datetime.strptime(test_date_str1, "%Y-%m-%d").date()
    test_date_str4 = '2023-12-20'
    test_date4 = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str5 = '2023-11-22'
    test_date5 = datetime.strptime(test_date_str1, "%Y-%m-%d").date()
    

    interview1 = Interview(
        userId=1,
        position='Software Engineer',
        company="Amazon",
        location='New York',
        status='Pending',
        type='Onsite',
        date=test_date

    )
    interview2 = Interview(
        userId=1,
        position='Front-end Engineer',
        company="Chase",
        location='New York',
        status='Scheduled',
        type='Onsite',
        date=test_date1

    )
    interview3 = Interview(
        userId=2,
        position='Senior Engineer',
        company="Bank of America",
        location='New York',
        status='Pending',
        type='Remote',
        date=test_date2

    )
    interview4 = Interview(
        userId=2,
        position='Cloud Engineer',
        company="Walmart",
        location='New York',
        status='Scheduled',
        type='Onsite',
        date=test_date3

    )
    interview5 = Interview(
        userId=3,
        position='Cloud Engineer',
        company="Netflix",
        location='New York',
        status='Scheduled',
        type='Remote',
        date=test_date4

    )
    interview6 = Interview(
        userId=3,
        position='Cloud Engineer',
        company="Facebook",
        location='New York',
        status='Scheduled',
        type='Remote',
        date=test_date5

    )
    db.session.add(interview1)
    db.session.add(interview2)
    db.session.add(interview3)
    db.session.add(interview4)
    db.session.add(interview5)
    db.session.add(interview6)
    db.session.commit()

def undo_interviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.interviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text('DELETE FROM interviews'))
    db.session.commit()

