from app.models import db, Interview, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_interviews():

    test_date_str = '2024-12-10'
    test_date = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str1 = '2024-03-10'
    test_date1 = datetime.strptime(test_date_str1, "%Y-%m-%d").date()
    test_date_str2 = '2024-04-02'
    test_date2 = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str3 = '2024-03-15'
    test_date3 = datetime.strptime(test_date_str1, "%Y-%m-%d").date()
    test_date_str4 = '2024-02-20'
    test_date4 = datetime.strptime(test_date_str, "%Y-%m-%d").date()
    test_date_str5 = '2024-01-22'
    test_date5 = datetime.strptime(test_date_str5, "%Y-%m-%d").date()
    test_date6 = datetime.strptime('2024-05-22', "%Y-%m-%d").date()
    test_date7 = datetime.strptime('2024-06-25', "%Y-%m-%d").date()
    test_date8 = datetime.strptime('2024-07-05', "%Y-%m-%d").date()
    test_date9 = datetime.strptime('2024-08-13', "%Y-%m-%d").date()
    test_date10 = datetime.strptime('2024-09-15', "%Y-%m-%d").date()
    test_date11= datetime.strptime('2024-10-16', "%Y-%m-%d").date()
    test_date12= datetime.strptime('2024-11-20', "%Y-%m-%d").date()
    

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
        position='Front-End Engineer',
        company="Chase",
        location='New York',
        status='Scheduled',
        type='Onsite',
        date=test_date1

    )
    interview7 = Interview (
        userId = 1,
        position = 'React Developer',
        company='DICE',
        location='California',
        type='Remote',
        status='Declined',
        date=test_date6
    )
    interview8 = Interview (
        userId = 1,
        position = 'Angular Developer',
        company='SiriusXM',
        location='Texas',
        status='Offered',
        type='Onsite',
        date=test_date7
    )
    interview9 = Interview (
        userId = 1,
        position = 'Python Backend Engineer',
        company='991 Inform',
        location='New Jersey',
        status='Pending',
        type='Onsite',
        date=test_date8
    )
    interview10 = Interview (
        userId = 1,
        position = 'Junior Developer',
        company='AT&T',
        location='New Jersey',
        status='Declined',
        type='Remote',
        date=test_date9
    )
    interview11 = Interview (
        userId = 1,
        position = 'Full Stack Developer',
        company='Verison',
        location='Virginia',
        type= 'Onsite',
        status='Pending',
        date = test_date10
    )
    interview12 = Interview (
        userId = 1,
        position = 'Cloud Engineer',
        company='Facebook',
        location='California',
        status='Offered',
        type= 'Remote',
        date = test_date11
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
    db.session.add(interview7)
    db.session.add(interview8)
    db.session.add(interview9)
    db.session.add(interview10)
    db.session.add(interview11)
    db.session.add(interview12)
    db.session.commit()

def undo_interviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.interviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text('DELETE FROM interviews'))
    db.session.commit()

