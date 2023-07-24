# API-Routes

Following API are used to obtain proper functionality of this application

## Homepage / Dashboard

- 'GET /api/'

## Inteview/

- 'GET /api/interviews/current' 
- 'PUT /api/interviews/:interviewid' 
- 'POST /api/interviews' 
- 'DELETE /api/interviews/:interviewId'
- 'GET /api/interviews/:interviewId'

## Favoritelists

- `GET /api/favoritelists`
- `GET /api/favoritelists/:favoritelistId`
- `POST /api/favoritelists/new`
- `DELETE /api/favoritelists/:favoritelistId`
- `PUT /api/favoritelists/:favoritelistId`

## Comments 

- `GET /api/comments/:interviewId`
- `POST /api/comments`
- `DELETE /api/commnets/:commentId`
- `PUT /api/comments/:commentId`

## Jobs
- 'GET /api/jobs/:favoritelistId'
- 'POST /api/jobs'
- 'DELETE /api/jobs/:jobId

