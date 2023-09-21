const GET_ALLINTERVIEWS = 'allinterviews/GET_INTERVIEWS'
const DELETE_USERCOMMENT = 'allusersInterviews/DELETE_USERCOMMENT'
const ADD_USERCOMMENT = 'allusersInterviews/ADD_USERCOMMENT'
const EDIT_USERCOMMENT = 'allusersInterviews/EDIT_USERCOMMENT'
const CLEAR_ALLINTERVIEWS = 'allinterviews/GET_INTERVIEWS'

export const getAllUsersInterviews = (interviews) => {
    return {
        type: GET_ALLINTERVIEWS,
        payload: interviews
    }
}
export const addUserComment = (interviewId, comment) => {
    return {
        type: ADD_USERCOMMENT,
        payload: {
            interviewId,
            comment
        }
    }
}
export const deleteUserComment = (interviewId, commentId) => {
    return {
        type: DELETE_USERCOMMENT,
        payload: {
            interviewId,
            commentId
        }
    }
}
export const editUserComment = (commentId, interviewId, comment) => {
    return {
        type: EDIT_USERCOMMENT,
        payload: {
            commentId,
            interviewId,
            comment
        }
    }
}

export const clearAllInterviews = () => {
    return {
        type: CLEAR_ALLINTERVIEWS
    }
}

export const getAllUsersInterviewThunk = () => async (dispatch) => {
    const response = await fetch('/api/interviews/allinterviews');
    if (response.ok) {
        const interviews = await response.json()
        await dispatch(getAllUsersInterviews(interviews))
        return interviews
    }
}
export const addUserCommentThunk = (interviewId, commentObj) => async (dispatch) => {
    const response = await fetch(`/api/comments/${interviewId}/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: commentObj.comment
        })
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(addUserComment(interviewId, data))
    }
}
export const editUserCommentThunk = (commentId, interviewId, comment) => async (dispatch) => {
   
    const response = await fetch(`/api/comments/${commentId}/interviews/${interviewId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    
    if (response.ok) {
        
        const data = await response.json()
        dispatch(editUserComment(commentId, interviewId, data))
        return data
    }
}
export const deleteUserCommentThunk = (interviewId, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${interviewId}/interviews/${commentId}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(deleteUserComment(interviewId, commentId))
        return true
    }
    return false
}


export default function allusersInterviews(
    state = {}, action) {
    let newState = {}
    switch (action.type) {
        case GET_ALLINTERVIEWS:
            newState = { ...state }
            action.payload.forEach((interview) => {
                newState[interview.id] = interview
            })
            return newState
        case ADD_USERCOMMENT:
            newState = { ...state }
            const { interviewId, comment } = action.payload
            newState[interviewId] = {
                ...newState[interviewId],
                comment: [...newState[interviewId].comments, comment]
            }
            return newState
        case EDIT_USERCOMMENT:
            newState = { ...state }
            const interId = action.payload.interviewId
            const commId = action.payload.commentId
            const commen = action.payload.comment
            

            newState[interId].comments.commId = commen
            
            return newState
        case DELETE_USERCOMMENT:
            newState = { ...state }
            const { inteId, commentId } = action.payload;
            if (newState[inteId]) {
                newState[inteId].comments = newState[inteId].comments.filter((comment) => comment.id !== commentId)
            }
            return newState

        case CLEAR_ALLINTERVIEWS:
            return {}
        default:
            return state
    }
}