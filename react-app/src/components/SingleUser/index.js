import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllInterviews, getAllInterviewsThunk } from "../../store/interview";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SingleUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log (id, '-------------this is id')

    let interviews = useSelector((store) => store?.interview)
    interviews = Object.values(interviews)
    console.log(interviews, '--------------------single user')
    const userInterviews = interviews.filter ((interview) => Number(interview.userId) == id)

    console.log (userInterviews, '------------these belong th the uses')

    const pendingInterviews = userInterviews  .filter((interview) => interview.status === 'Pending')

    const scheduledInterviews = userInterviews.filter ((interview) => 
        interview.status = 'Scheduled')
    
   
    useEffect(async () => 
        dispatch(getAllInterviewsThunk()), [dispatch]
    )
    return (

        <>
            {scheduledInterviews.map((interview) => {
                return (
                    <div key={interview.id}>
                        <p>{interview.company}</p>
                        <p>{interview.position}</p>
                        <p>{interview.location}</p>
                        <p>{interview.status}</p>
                        <p>Helooooooooooooooooooo</p>

                    </div>
                )
            })}


            {pendingInterviews.map((interview) => {
                return (

                <div key={interview.id}>
                    <p>{interview.company}</p>
                    <p>{interview.position}</p>
                    <p>{interview.location}</p>
                    <p>{interview.status}</p>
                </div>
                )
            })}


        </>
    )


}

export default SingleUser


