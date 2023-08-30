from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# edit user info
@user_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def edit_info(id):
    user = User.query.get(id)
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    career = data.get('career')
    first_name = data.get('firstName')
    last_name = data.get('last_name')
    location = data.get('location')
    bio = data.get('bio')
    user.username = username
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.location = location
    user.bio = bio
    user.career = career

    db.session.commit()

    return jsonify(user.to_dict())
