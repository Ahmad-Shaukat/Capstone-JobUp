import InterviewContainer from '../InterviewContainer'
import InterviewSearchContainer from '../InterviewSearch'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

const AllInterviews = () => {
    let {interview, isLoading} = useSelector((store)=> store)
    // console.log (interview, '--------------------')
    // console.log (isLoading, '--------------')
    interview = Object.values(interview)
    if (isLoading) {
        return <>
        <h1>Loading</h1>
        </>
    }
    if (interview.length === 0) {
        return <>
        <h2>No jobs to display</h2>
        </>
    }
    // console.log (loading)
    return <>
    <InterviewSearchContainer />
    <InterviewContainer />
    <div>
        {interview.map((job) => {
            console.log (job)
        })}
    </div>
    
    </>
}
export default AllInterviews