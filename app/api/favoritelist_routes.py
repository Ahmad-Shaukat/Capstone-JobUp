from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import FavoriteList, db

favorites_routes = Blueprint('favorites', __name__)


# GET /api/favorites/current
# get all interviews for the current user
@favorites_routes.route('/current')
# @login_required
def favorites_current():
    userId = current_user.id
    fav_lists = FavoriteList.query.filter(FavoriteList.userId == 1)
    lists = [fav_list.to_dict() for fav_list in fav_lists ]
    return jsonify(lists)


# GET /api/favorites/favoritesList<id>/one
# get interview by id
@favorites_routes.route('/<id>/one')
# @login_required
def favorites_one(id):
    fav_list = FavoriteList.query.get(id)
    return fav_list.to_dict()


# POST /api/favorites/new
# make a new favoritelist 
@favorites_routes.route('/new', methods=['POST'])
# @login_required
def favorites_new():
    data = request.get_json()
    name = data.get('name')
    new_favlist = FavoriteList(
        name = name,
        # userId = current_user.id
        userId = 1

    )
    db.session.add(new_favlist)
    db.session.commit()
    return new_favlist.to_dict()

# PUT /api/favorites/favoritesList<id>/edit
# edit favoritelist using the id
@favorites_routes.route('/<id>/edit', methods=['PUT'])
# @login_required
def favorites_edit(id):
    filtered_fav = FavoriteList.query.get(id)
    if not filtered_fav:
        return 'Favorite list not found'
    data = request.get_json()
    name = data.get('name')
    filtered_fav.name = name
    db.session.commit()
    return filtered_fav.to_dict()

# DELETE /api/favorites/favoritesList<id>/delete
# delete favoritelist using the id
@favorites_routes.route('/<id>/delete', methods=['DELETE'])
# @login_required
def favorites_delete(id):
    filtered_fav = FavoriteList.query.get(id)
    if not filtered_fav:
        return 'Favorite list not found'
    db.session.delete(filtered_fav)
    db.session.commit()
    return {
        "message": "Successfully Deleted Favorite List"
    }
    
