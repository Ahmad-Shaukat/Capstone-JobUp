
import requests
from flask import Blueprint, jsonify, request
import datetime
from flask_login import login_required, current_user
import json
from urllib.request import urlopen
from datetime import datetime
import os





jobs_routes = Blueprint('jobs', __name__)


# /api/jobs/fullstack
# GET get all the full stack jobs

@jobs_routes.route('/fullstack')
@login_required
def full_stack():

    url = "https://usa-jobs-for-it.p.rapidapi.com/FullStack"

    headers = {
        "X-RapidAPI-Key": os.environ.get('X_RapidApi-Key'),
        "X-RapidAPI-Host": "usa-jobs-for-it.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    print(response.json(), '------------yellah')
    return jsonify(response.json())
    # print(response.json())



# /api/jobs/Python
# Get get all python jobs
@jobs_routes.route('/react')
@login_required
def react_jobs():
        url = "https://usa-jobs-for-it.p.rapidapi.com/React"

        headers = {
        "X-RapidAPI-Key": os.environ.get('X_RapidApi-Key'),
        "X-RapidAPI-Host": "usa-jobs-for-it.p.rapidapi.com"
    }

        response = requests.get(url, headers=headers)
        # print(response.json())
        return jsonify(response.json())

@jobs_routes.route('/python')
@login_required
def python_jobs():
        url = "https://usa-jobs-for-it.p.rapidapi.com/Python"

        headers = {
        "X-RapidAPI-Key": os.environ.get('X_RapidApi-Key'),
        "X-RapidAPI-Host": "usa-jobs-for-it.p.rapidapi.com"
    }

        response = requests.get(url, headers=headers)
        # print(response.json())
        return jsonify(response.json())



# /api/jobs/DataEngineer
# Get get all dataengineer jobs
@jobs_routes.route('/dataengineer')
@login_required
def data_jobs():
        url = "https://usa-jobs-for-it.p.rapidapi.com/DataEngineer"

        headers = {
        "X-RapidAPI-Key": os.environ.get('X_RapidApi-Key'),
        "X-RapidAPI-Host": "usa-jobs-for-it.p.rapidapi.com"
    }

        response = requests.get(url, headers=headers)
        # print(response.json())
        return jsonify(response.json())


