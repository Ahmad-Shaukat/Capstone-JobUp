import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import { getAllInterviewsThunk } from "../../store/interview"
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import './app.css'





function Stats() {
    
    const dispatch = useDispatch()
    let interviews = useSelector((store) => store.interview)
    interviews = Object.values(interviews)
    console.log(interviews, '-----------these are all')
    // let pendingInterviews = interviews.filter(())
    const pendingInterviews = Object.values(interviews).filter((interview) => interview.status === 'Pending');
    const scheduledInterviews = Object.values(interviews).filter((interview) => 
        interview.status === 'Scheduled'
    )
    const declinedInterviews = Object.values(interviews).filter((interview) => 
        interview.status === 'Declined'
     )
    console.log (pendingInterviews.length, 'these are pending interivew --------------')
    console.log (scheduledInterviews.length, 'these are scheduled interviews')
    console.log (declinedInterviews.length, 'these are declined interviews')
    

    // let pendingInterviews = interviews.filter(interview => interview['status'] = 'Pending')
    // console.log(pendingInterviews, '--------------these are pending ')
    // console.log (interviews, '--------------------')
    useEffect( async () => 
        dispatch(getAllInterviewsThunk())
    , [dispatch])

    return (
        <main className="stats-main-container">
            <div className="stats-card-main-container">
                <div className="stats-pending-container stats-pending-border">
                    <div className="left-card-container" >
                        <div className="stats-number stats-pending-colors">
                            <p>{pendingInterviews.length}</p>
                        </div>
                        
                        <p className="stats-text">Pending Interviews</p>
                    </div>
                    <div className="right-card-container">
                        <div className="stats-icon-wrapper stats-icon-wrapper-pending"> 
                            <FaSuitcaseRolling  className="stats-pending-colors"/>
                        </div>
                    </div>
                </div>
                <div className="stats-test stats-schduled-border" >
                    <div className="left-card-container" >
                        <div className="stats-number">
                            <p id="stats-scheduled-text">{scheduledInterviews.length}</p>
                        </div>
                        
                        <p className="stats-text">Scheduled Interviews</p>
                    </div>
                    <div className="right-card-container">
                        <div className="stats-icon-wrapper stats-icon-wrapper-scheduled"> 
                            <FaCalendarCheck id="stats-scheduled-text" />
                        </div>
                    </div>
                </div>
                <div className="stats-test stats-schduled-declined" >
                    <div className="left-card-container" >
                        <div className="stats-number">
                            <p className="stats-declined-colors">{declinedInterviews.length}</p>
                        </div>
                        
                        <p className="stats-text">Declined Interviews</p>
                    </div>
                    <div className="right-card-container">
                        <div className="stats-icon-wrapper stats-icon-wrapper-declined"> 
                            <FaBug className="stats-declined-colors" />
                        </div>
                    </div>
                </div>
                
                {/* <div className="stats-pending-container">
                    <div className="left-card-container" >
                        <div className="stats-declined-colors">
                            <p>{declinedInterviews.length}</p>
                        </div>
                        
                        <p className="stats-text">Declined Interviews</p>
                    </div>
                    <div className="right-card-container">
                        <div className="stats-icon-wrapper"> 
                            <FaBug className="stats-declined-colors" />
                        </div>
                    </div>
                </div> */}
                
                
                
            </div>
        </main>
    )
}

export default Stats