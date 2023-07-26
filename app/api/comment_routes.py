from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, db
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# GET /api/comments/interviewId
# get all the comments related to interview
@comment_routes.route('/<id>/interview')
def comments_interview(id):
    comments = Comment.query.filter(Comment.interviewId == id).all()
    if not comments:
        return jsonify("No comments found")
    comments_list = [comment.to_dict() for comment in comments]
    return jsonify(comments_list)

# GET /api/comments/all
# get all the comments related to the user
@comment_routes.route('/current')
def comments_user():
    comments = Comment.query.filter(Comment.userId == 1)
    comments_list = [comment.to_dict() for comment in comments]
    return jsonify(comments_list)

# POST /api/comments/new
# post a new comment
@comment_routes.route('/new', methods=['POST'])
# @login_required
def comment_post():
    data = request.get_json()
    userId = current_user.id
    interivewId = data.get('interviewId')
    comment = data.get('comment')

    new_comment = Comment(
        userId = userId,
        interviewId = interivewId,
        comment = comment

    )
    db.session.add(new_comment)
    db.session.commit()

# PUT /api/comments/put
# edit comment using comment id

@comment_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def comment_edit(id):
    filtered_comment = Comment.query.get(id)
    data = request.get_json()
    comment = data.get('comment')
    filtered_comment.comment = comment
    db.session.commit()

    return jsonify(filtered_comment.to_dict())

# DELETE /api/comments/<commentId>/delete
# delete comment using comment id
@comment_routes.route('/<id>/delete', methods=['DELETE'])
@login_required
def comment_delete():
    filtered_comment = Comment.query.get(id)
    db.session.delete(filtered_comment)
    db.session.commit()
    return {
        "message": "comment successfully deleted"
    }
    


