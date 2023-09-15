const GET_REACT = 'reactJobs/GET_REACT'
const CLEAR_REACT = 'reactJobs/CLEAR_REACT'

export const  getReactJobs = (jobs) => {
    return {
        type: GET_REACT,
        payload: jobs
    }
}
export const clearReactJobs = () => {
    return {
        type: CLEAR_REACT
    }
}

export const getReactJobsThunk = () => async (dispatch) => {
    const response = await fetch('/api/jobs/react');
    if (response.ok) {
        const jobs = await response.json()
        await dispatch(getReactJobs(jobs))
        return jobs
    }
}

export default function reactReducer(state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_REACT:
            newState = { ...state }
            action.payload.forEach((job) => {
                newState[job.IdNumber] = job
            })
            return newState
        case CLEAR_REACT:
            return {}
        default:
            return state
    }
}