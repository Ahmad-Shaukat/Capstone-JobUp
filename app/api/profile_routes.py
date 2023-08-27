from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Interview, db, Profile, User

profile_routes = Blueprint('profiles', __name__)





# get a profile of current user
@profile_routes.route('/current')
@login_required
def current_profile():
    profile = Profile.query.filter(Profile.userId == current_user.id).first()
    
    return profile.to_dict()

# get all the profiles
@profile_routes.route('/all')
@login_required
def all_profiles():
    profiles = Profile.query.all()
    profiles_list = [profile.to_dict() for profile in profiles]
    return jsonify(profiles_list)

