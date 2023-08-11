from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Interview, db, Comment, User
from datetime import datetime, time
# import pytz

interview_routes = Blueprint('interviews', __name__)


@interview_routes.route('/test')
def watchlist_test():
    in_route = "In Route :)"
    return jsonify(in_route)


# GEt all interviews of all the users
@interview_routes.route('/allinterviews')
@login_required
def all_interviews ():
    interviews = Interview.query.all()
    interviews_list = [interview.to_dict() for interview in interviews]
    return jsonify(interviews_list)

# GET /api/interviews/current
# get all interviews for the current user
@interview_routes.route('/current')
@login_required
def interviews_current():
    # user_id = current_user.id
    interviews = Interview.query.filter(Interview.userId == 1)
    interviews_list = [interview.to_dict() for interview in interviews]
    user_Info = User.query.get(current_user.id)
    print(interviews_list)
    return jsonify(interviews_list)


# GET /api/interviews/interviewId
# get interview using the interview date

@interview_routes.route('/<id>/one')
@login_required
def interview_get_one(id):
    filtered_interview = Interview.query.get(id)
    return filtered_interview.to_dict()



# GET /api/interviews/scheduled
# get all interviews that are scheduled
@interview_routes.route('/scheduled')
@login_required
def interviews_scheduled():
    interviews = Interview.query.join(Comment).filter(Interview.status == 'Scheduled').all()
    interviews_list = [interview.to_dict() for interview in interviews]
    return jsonify(interviews_list)

# GET /api/interviews/declined
# get all interviews that are declined
@interview_routes.route('/declined')
@login_required
def interviews_declined():
    interviews = Interview.query.filter(Interview.status == 'Declined')
    interviews_list = [interview.to_dict() for interview in interviews]
    return jsonify(interviews_list)



# POST /api/interivews/new
# create a new interviews
@interview_routes.route('/new', methods=['POST'])
@login_required
def interview_post():
    data = request.get_json()
    position = data.get('position')
    company = data.get('company')
    location = data.get('location')
    status = data.get('status')
    date = data.get('date')
    print (date, '---------this is date-----------')
    interivew_date = datetime.strptime(date, '%Y-%m-%d').date()
    print(interivew_date, '-----------------formatted')

    new_interivew = Interview (
        userId = current_user.id,
        position = position,
        company = company,
        location = location,
        status = status,
        date = interivew_date

    )
    db.session.add(new_interivew)
    db.session.commit()
    
    return jsonify(new_interivew.to_dict())

# PUT /api/interivews/:interivewId
# Edit a interviews by interview id
@interview_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def interview_edit(id):
    filtered_interview = Interview.query.get(id)
    data = request.get_json()
    position = data.get('position')
    company = data.get('company')
    location = data.get('location')
    status = data.get('status')
    date = data.get('date')
    print(date, '--------------this is date')
    interview_date = datetime.strptime(date, '%Y-%m-%d').date()
    print(interview_date, '--------------this is interview date')
    # interview_date = datetime.combine(interview_date, time.min)

    filtered_interview.position = position
    filtered_interview.company = company
    filtered_interview.location = location
    filtered_interview.status = status 
    filtered_interview.date = interview_date

    db.session.commit()

    return jsonify(filtered_interview.to_dict())

# DELETE /api/interviews/<interviewId>/delete
# delete interivew using interview data

@interview_routes.route('/<id>/delete', methods=['DELETE'])
@login_required
def interview_delete(id):
    filtered_interview = Interview.query.get(id)
    db.session.delete(filtered_interview)
    db.session.commit()
    return {
        "message": "Successfully deleted interview"
    }

    
    