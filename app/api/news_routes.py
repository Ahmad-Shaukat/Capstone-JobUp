from flask import Blueprint, jsonify, request
import requests
from flask_login import login_required, current_user
news_routes = Blueprint('news', __name__)
from newsapi import NewsApiClient

# get news article realted to the jobs 
@news_routes.route('/articles')
# def news_articles():
#     url = 'https://newsapi.org/v2/everything?q="hiring"&apiKey=0c61aa51eef045638d6c0701c44eba5a&domains=ycombinator.com,careersatbright.com'
#     response= requests.get(url, headers=headers)
#     print(response.json(), 'yellah')
#     return jsonify({'message'})

def news_articles():
    newsapi = NewsApiClient(api_key='0c61aa51eef045638d6c0701c44eba5a')

# /v2/top-headlines
    top_headlines = newsapi.get_everything(q='hiring',
                                              domains ='ycombinator.com,careersatbright.com'
                                          )
    # print(top_headlines, '----------------------------')
    return jsonify(top_headlines)