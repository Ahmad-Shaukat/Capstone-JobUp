from app.models import db, FavoriteList, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favoritelists():
    list1 = FavoriteList(
        userId = 1, 
        name='Backend Jobs', 
    )

    list2 = FavoriteList(
        userId = 1, 
        name = 'Front-end Jobs'
    )

    db.session.add(list1)
    db.session.add(list2)
    db.session.commit()

def undo_favoriteLists():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.favoritelists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favoritelists"))
    db.session.commit()

