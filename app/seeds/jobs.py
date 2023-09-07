from app.models import db, Job, environment, SCHEMA
from sqlalchemy.sql import text

def seed_jobs():
    job1 = Job(
        listId = 1, 
        position = 'Front-end Engineer',
        IdNumber = 4000
        # location = 'New York', 
        # description = 'As a frontend developer, you will be responsible for designing and implementing user interfaces, ensuring an engaging and intuitive user experience. Your expertise in HTML, CSS, and JavaScript will drive the creation of visually appealing and responsive web applications that seamlessly interact with backend services.'
    )
    job2 = Job(
        listId = 2,
        position = 'Backend Engineer',
        IdNumber =  5000
        # location = 'New Jersey',
        # description = "As a backend engineer, your role will involve developing and maintaining the server-side logic and database systems that power web applications. You'll be responsible for building robust, scalable, and efficient backend architectures to support the seamless functioning of the application and enable smooth data processing and storage."
    )

    db.session.add(job1)
    db.session.add(job2)
    db.session.commit()

def undo_jobs():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.jobs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM jobs"))
    db.session.commit()