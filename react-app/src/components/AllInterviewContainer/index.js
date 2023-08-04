import InterviewSearchContainer from '../InterviewSearch'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import EditInterviewForm from '../EditInterviewForm'
import {format} from 'date-fns'
import DeleteInterview from '../DeleteInterviewModal'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const AllInterviews = () => {
    let { interview } = useSelector((store) => store)
    interview = Object.values(interview)
    console.log (interview)



    return <>
        <div>Hello</div>

        <div>
            {interview.map((interview) => {
                // const interviewDate = new Date(interview.date)
                // const formattedDate = format(interviewDate, 'EEEE, MMMM d, yyyy', { timeZone: 'GMT' });
                
                return (

                    <div>
                        <p>{interview.position}</p>
                        <p>{interview.company}</p>
                        <p>{interview.location}</p>
                        <p>{interview.status}</p>
                        <p>{interview['date'].slice(0, 17)}</p>
                        <button>
                            <OpenModalButton
                                buttonText={'Edit'}
                                modalComponent={
                                    <EditInterviewForm
                                        interview={interview} id={interview.id}
                                    />
                                }
                            />
                    
                </button>
                <button>
                    <OpenModalButton 
                    buttonText={'Delete'}
                    modalComponent={
                        <DeleteInterview 
                        interview={interview}
                        />
                    }
                    />
                </button>
                <NavLink exact to = {`/interview/${interview.id}/detail`}><button>More</button></NavLink>
                    </div>
                )
            })}
        </div>

    </>
}
export default AllInterviews