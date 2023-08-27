from app.models import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_profiles():
    profile_1 = Profile(
        userId = 1,
        first_name= 'Demo',
        last_name= 'Doe',
        career= 'Software Engineer',
        location= 'San Francisco, CA',
        bio= 'Passionate about crafting elegant solutions to complex problems. Experienced in full-stack web development and cloud technologies.'
    )
    profile_2 = Profile(
        userId = 2,
        first_name= 'Marnie',
        last_name= 'Smith',
        career= 'Data Scientist',
        location= 'New York, NY',
        bio= 'Data enthusiast with a knack for deriving insights from messy datasets. Skilled in machine learning, statistical analysis, and data visualization.'
    )
    profile_3 = Profile(
        userId = 3,
        first_name= 'Bobbie',
        last_name= 'Johnson',
        career= 'UX/UI Designer',
        location= 'London, UK',
        bio= 'Design-driven problem solver dedicated to creating seamless user experiences. Proficient in wireframing, prototyping, and user-centered design principles.'
    )
    db.session.add(profile_1)
    db.session.add(profile_2)
    db.session.add(profile_3)

def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))
        
    db.session.commit()

