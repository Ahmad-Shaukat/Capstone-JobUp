const GET_INTERVIEW = 'interview/GET_INTERVIEW';
const ADD_INTERVIEW = 'interview/ADD_INTERVIEW';
const DELETE_INTERVIEW = 'interview/DELETE_INTERVIEW';
const ADD_COMMENT = 'interview/ADD_COMMENT'
const DELETE_COMMENT = 'interview/DELETE_COMMENT'
const EDIT_COMMENT = 'interview/EDIT_COMMENT'

export const getAllInterviews = (interviews) => {
    return {
        type:GET_INTERVIEW,
        payload: interviews
    }
}

export const addInterview = (interview) => {
    return {
        type:ADD_INTERVIEW,
        payload: interview
    }
}
export const deleteInterview = (interview) => {
    return {
        type: DELETE_INTERVIEW,
        payload: interview
    }
}
export const addComment = (interviewId, comment) => {
    return {
        type: ADD_COMMENT,
        payload: {
            interviewId, 
            comment
        }
    }
}

export const deleteComment = (interviewId, commentId) => {
    return {
        type: DELETE_COMMENT, 
        payload: {
            interviewId,
            commentId
        }
    } 
}

export const editComment = (commentId, interviewId, comment) => {
    return {
        type: EDIT_COMMENT,
        payload: {
            commentId, 
            interviewId,
            comment
        }
    }
}


export const getAllInterviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/interviews/current');
    if (response.ok) {
        const interviews = await response.json();
        await dispatch(getAllInterviews(interviews))
        return interviews;
    }

}

export const createInterviewThunk = (interview) => async (dispatch) => {
    const response = await fetch('/api/interviews/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(interview)
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(addInterview(data));
        return data
    }
}

export const deleteInterviewThunk = (interview) => async (dispatch) => {
    const response = await fetch (`/api/interviews/${interview.id}/delete`, {
        method:'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(interview)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteInterview(interview.id))
    }
}
export const editInterviewThunk = (id, updatedInterview) => async (dispatch) => {
    const response = await fetch (`/api/interviews/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body:JSON.stringify(updatedInterview)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addInterview(data))
        return data
    }
}
export const addCommentThunk = (interviewId, commentObj) => async (dispatch) => {
    const response = await fetch (`/api/comments/${interviewId}/new`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            comment: commentObj.comment
        })
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(interviewId, data))
    }
}
export const editCommentThunk = (commentId, interviewId, comment) => async (dispatch) => {
    // console.log (commentId, '---------------------in the fetch')
    // console.log (interviewId, '-----------------in the fetch')
    const response = await fetch (`/api/comments/${commentId}/interviews/${interviewId}/edit`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(comment)
    })
    console.log ('---------begining thunk')
    if (response.ok) {
        console.log ('-------------after thunk')
        const data = await response.json()
        dispatch(editComment(commentId,interviewId, data))
        return data
    }
}
export const deleteCommentThunk = (interviewId, commentId) => async (dispatch) => {
    const response = await fetch (`/api/comments/${interviewId}/interviews/${commentId}/delete`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    } )
    if (response.ok) {
        dispatch(deleteComment(interviewId, commentId))
        return true
    }
    return false
}
 
export default function interviewsReducer (state ={}, action) {
    let newState = {}
    switch (action.type) {
        case GET_INTERVIEW:
            newState = {...state};
            action.payload.forEach((interview) => {
                newState[interview.id] = interview
            });
            return newState
        case ADD_INTERVIEW:
            newState = {...state}
            newState[action.payload.id] = action.payload;
            return newState
        case DELETE_INTERVIEW:
            newState = {...state}
            delete newState[action.payload]
            return newState
        case ADD_COMMENT:
            newState = {...state}
            const {interviewId, comment} = action.payload
            newState[interviewId] = {
                ...newState[interviewId], 
                comment: [...newState[interviewId].comments, comment]
            }
            return newState
        case EDIT_COMMENT:
            newState = {...state}
            const interId = action.payload.interviewId
            const commId = action.payload.commentId
            const commen = action.payload.comment
            // const {interId, commId, commen} = action.payload 
            // console.log (action.payload, '-------------------------------------')
            console.log (action.payload, '-----------------------------')
            console.log(interId)
            console.log (newState)
            console.log (newState[interId], '----------------------------------')

            newState[interId].comments.commId = commen
            // console.log (interId, '----------------id')
            // console.log (commId, '------------------------')
            // console.log (commen)
            return newState
        case DELETE_COMMENT:
            newState = {...state}
            const {inteId, commentId} = action.payload;
            if (newState[inteId]) {
                newState[inteId].comments = newState[inteId].comments.filter((comment) => comment.id !== commentId)
            }
            return newState
        default:
            return state




    }
}