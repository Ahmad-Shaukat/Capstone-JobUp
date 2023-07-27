const GET_INTERVIEW = 'interview/GET_INTERVIEW';
const ADD_INTERVIEW = 'interview/ADD_INTERVIEW';
const DELETE_INTERVIEW = 'interview/DELETE_INTERVIEW';

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
        const data = await responsoe.josn()
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
    }
}