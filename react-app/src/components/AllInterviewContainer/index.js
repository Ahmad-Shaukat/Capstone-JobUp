import InterviewContainer from '../InterviewContainer'
import InterviewSearchContainer from '../InterviewSearch'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

const AllInterviews = () => {
    let {interview} = useSelector((store)=> store)
    interview = Object.values(interview)


    return <>
    <div>Hello</div>
    
    <div>
        {interview.map((interview) => {
            const interviewDate = new Date(interview.date)

            const formattedDate = interviewDate.toLocaleDateString('en-Us', {
                year:'numeric',
                month:'long',
                day: 'numeric'            })
            return (

            <div> 
                <p>{interview.position}</p>
                <p>{interview.company}</p>
                <p>{interview.location}</p>
                <p>{interview.status}</p>
                <p>{formattedDate}</p>
            </div>
            )
        })}
    </div>
    
    </>
}
export default AllInterviews