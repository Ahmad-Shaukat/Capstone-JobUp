const GET_FULLSTACK = 'fullstack/GET_FULLSTACK'

export const getFullStackJobs = (jobs) => {
    return {
        type: GET_FULLSTACK,
        payload: jobs
    }
}

export const getFullStackJobsThunk = () => async (dispatch) => {
    const response = await fetch('/api/jobs/fullstack');
    if (response.ok) {
        const jobs = await response.json()
        await dispatch(getFullStackJobs(jobs))
        return jobs
    }
}

export default function fullStackReducer(state = {}, action) {
    let newState = {}
    switch (action.type) {
        case GET_FULLSTACK:
            newState = { ...state }
            console.log (action.payload, '-----------this is payload')
            action.payload.forEach((job) => {
                newState[job.IdNumber] = job
            })
            return newState
        default:
            return state

    }
} 