const GET_PYTHON = 'python/GET_PYTHON'

export const getPythonJobs = (jobs) => {
    return {
        type:GET_PYTHON,
        payload: jobs
    }
}

export const getPythonJobsThunk  = () => async (dispatch) => {
    const response = await fetch('/api/jobs/python');
    if (response.ok) {
        const jobs = await response.json()
        await dispatch(getPythonJobs(jobs))
        return jobs
    }
} 
export default function 
pythonReducer (state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_PYTHON:
            newState = {...state}
            action.payload.forEach((job) => {
                newState[job.IdNumber] = job
            })
            return newState
        default:
            return state
    }

}