from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
import boto3
import uuid
import os

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



# allowed extension
Allowed_Extensions = ['jpg', 'jpeg', 'png']
# returns boolean based on the allowed extension 
def allowd_files(filename):
    return '.' in filename and filename.rsplit('.') in Allowed_Extensions
# 
# upload to the s3 profile iamge 
@user_routes.route('/<userId>/uploadImage', methods=['PUT'])
def upload_image(userId):
    mysession = boto3.session.Session(aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'), aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))
    # mysession = boto3.session.Session(profile_name="fooboar")
    s3_client = mysession.client("s3")
                        
   
    user=User.query.get(userId)
    userImage = user.image
    print(os.environ.get('AWS_ACCESS_KEY'), '------------this is the access key')
    # print(user.to_dict(), '-------------this is user')
    if user.image == None:
        uploaded_file = request.files['file-to-save']
        new_filename = uuid.uuid4().hex + '.' + uploaded_file.filename.rsplit('.',1)[1].lower()
        new_name =   str(user.id)+uploaded_file.filename
        user.image = new_name
        db.session.commit()
        s3_client.upload_fileobj(uploaded_file,'jobsphere', new_name, ExtraArgs=None, Callback=None, Config=None)
        return {'message': 'successfully'}
    if user.image !=None:
       
        print(user.image, '---------------------')
        uploaded_file = request.files['file-to-save']
       
        new_name = str(user.id)+uploaded_file.filename 
        user.image = new_name
        db.session.commit()
        # new_filename = user.image
        s3_client.upload_fileobj(uploaded_file,'jobsphere', new_name, ExtraArgs=None, Callback=None, Config=None)
        
    return {'message' : 'successfully'}



