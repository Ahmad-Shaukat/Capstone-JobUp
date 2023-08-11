import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllInterviews, getAllInterviewsThunk } from "../../store/interview";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllUsersInterviewThunk } from "../../store/allinterviews";
import { FaLocationArrow } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { BsCalendar2Week } from 'react-icons/bs'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SingleUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log(id, '-------------this is id')

    let interviews = useSelector((store) => store?.allinterviews)
    let user = useSelector((store) => store?.session['user'])
    interviews = Object.values(interviews)
    console.log(interviews, '-----------------these are all the interviews')
    // console.log(interviews, '--------------------all the interviews')
    const userInterviews = interviews.filter((interview) => Number(interview.userId) == id)
    console.log(userInterviews, '--------------these belong to the users')

    // console.log (userInterviews, '------------these belong th the uses')

    // const pendingInterviews = userInterviews  .filter((interview) => interview.status === 'Pending')

    // const scheduledInterviews = userInterviews.filter ((interview) => 
    //     interview.status = 'Scheduled')


    useEffect(async () =>
        dispatch(getAllUsersInterviewThunk()), [dispatch]
    )
    return (


        <>
            <div className='allInt-container'>
                {userInterviews.map((interview) => {
                    // const interviewDate = new Date(interview.date)
                    // const formattedDate = format(interviewDate, 'EEEE, MMMM d, yyyy', { timeZone: 'GMT' });

                    return (


                        <div className='allInt-column'>
                            <div className='allInt-top-cont'>
                                <div className='allInt-com-letter'>
                                    <p>{interview.company[0].toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className='allInt-com-pos'>{interview.position}</p>
                                    <p className='allInt-com-name'>{interview.company}</p>
                                </div>
                            </div>
                            <div className='allInt-btm-container'>
                                <div className='allInt-btm-left-cont'>
                                    <div className='allInt-loc-type-cont'>
                                        <p className='allInt-loc-text'><FaLocationArrow className='allInt-loc-logo' />{interview.location}</p>
                                        <p>
                                            <MdWork className='allInt-type-logo' />{interview.type}
                                        </p>
                                    </div>

                                    <div className='allInt-btm-bttns'>

                                        {/* <button className='allInt-edit-btn'>
                                        <OpenModalButton
                                            buttonText={'Edit'}
                                            
                                            modalComponent={
                                                <EditInterviewForm
                                                    interview={interview} id={interview.id}
                                                />
                                            }
                                        />
                                    </button> */}





                                        {/* <button className='allInt-del-btn'>
    <OpenModalButton
                                            buttonText={'Delete'}
                                            modalComponent={
                                                <DeleteInterview
                                                    interview={interview}
                                                />
                                            }
                                        />
    </button>                                        */}

                                        <NavLink exact to={`/interview/${interview.id}/detail`} ><button className='allInt-btns-more'>More</button></NavLink>


                                    </div>


                                </div>
                                <div className='allInt-btm-right-container'>

                                    {user.id === interview.userId && (

                                        <p className='allInt-date'><BsCalendar2Week className='allInt-int-logo' />{interview['date'].slice(0, 17)}</p>
                                    )}
                                    {interview.status === 'Pending' && (
                                        <p className='allInt-Pending'>{interview.status}</p>
                                    )}
                                    {interview.status === 'Scheduled' && (
                                        <p className='allInt-Scheduled'>{interview.status}</p>
                                    )}
                                    {interview.status === 'Declined' && (
                                        <p className='allInt-Declined'>{interview.status}</p>
                                    )}
                                </div>
                            </div>





                        </div>
                    )
                })}
            </div>

        </>

        // <>
        //     {scheduledInterviews.map((interview) => {
        //         return (
        //             <div key={interview.id}>
        //                 <p>{interview.company}</p>
        //                 <p>{interview.position}</p>
        //                 <p>{interview.location}</p>
        //                 <p>{interview.status}</p>
        //                 <p>Helooooooooooooooooooo</p>

        //             </div>
        //         )
        //     })}


        //     {pendingInterviews.map((interview) => {
        //         return (

        //         <div key={interview.id}>
        //             <p>{interview.company}</p>
        //             <p>{interview.position}</p>
        //             <p>{interview.location}</p>
        //             <p>{interview.status}</p>
        //         </div>
        //         )
        //     })}


        // </>
        // <div>hello</div>
    )


}

export default SingleUser


