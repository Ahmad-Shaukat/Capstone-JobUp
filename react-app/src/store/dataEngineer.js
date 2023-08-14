const GET_DATAENGINEER = 'dataEngineer/GET_DATAENGINEER'
const CLEAR_DATAENGINEER = 'dataEngineer/CLEAR_DATAENGINEER'

export const getDataEngineerJobs = (jobs) => {
    return {
        type: GET_DATAENGINEER,
        payload: jobs
    }
}
export const clearDataEngineerJobs = () => {
    return {
        type:CLEAR_DATAENGINEER
    }
}

export const getDataEngineerJobsThunk = () => async (dispatch) => {
    const response = await fetch('/api/jobs/dataengineer')
    if (response.ok) {
        const jobs = await response.json()
        await dispatch(getDataEngineerJobs(jobs))
        return jobs
    }
}

export default function dataEngineerReducer (state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_DATAENGINEER:
            newState = {...state}
            action.payload.forEach((job) => {
                newState[job.IdNumber] = job
            })
            return newState
        case CLEAR_DATAENGINEER:
            return {}
        default:
            return state
    }
}