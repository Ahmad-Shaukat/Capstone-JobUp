from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        first_name= 'Demo',
        last_name= 'Doe',
        career= 'Software Engineer',
        location= 'San Francisco, CA',
        bio= 'Passionate about crafting elegant solutions to complex problems. Experienced in full-stack web development and cloud technologies.'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
     first_name= 'Marnie',
        last_name= 'Smith',
        career= 'Data Scientist',
        location= 'New York, NY',
        bio= 'Data enthusiast with a knack for deriving insights from messy datasets. Skilled in machine learning, statistical analysis, and data visualization.')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
             first_name= 'Bobbie',
        last_name= 'Johnson',
        career= 'UX/UI Designer',
        location= 'London, UK',
        bio= 'Design-driven problem solver dedicated to creating seamless user experiences. Proficient in wireframing, prototyping, and user-centered design principles.'    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()