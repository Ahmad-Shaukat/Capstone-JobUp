
from flask import Blueprint, jsonify, request
import datetime
from flask_login import login_required, current_user
import json
from urllib.request import urlopen
from datetime import datetime


import requests


jobs_routes = Blueprint('jobs', __name__)


# /api/jobs/fullstack
# GET get all the full stack jobs

@jobs_routes.route('/fullstack')
@login_required
def full_stack():

    url = "https://usa-jobs-for-it.p.rapidapi.com/FullStack"

    headers = {
        "X-RapidAPI-Key": "80ebbdc656mshc458e5c641670d2p11724fjsnc5d0cc104089",
        "X-RapidAPI-Host": "usa-jobs-for-it.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    print(response.json())
    return jsonify(response.json())
    # print(response.json())
