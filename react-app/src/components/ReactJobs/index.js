import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersThunk } from "../../store/user";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './app.css'
import { getReactJobsThunk } from "../../store/reactJobs";
import { createInterviewThunk } from "../../store/interview";
import { getAllInterviewsThunk } from "../../store/interview";



const ReactJobs = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    let reactJobs = useSelector((store) => store.reactJobs)
    reactJobs = Object.values(reactJobs)
    const handleAddInterview = async (title) => {
        // e.preventDefault()
        const today = new Date(); // Get today's date
    const formattedDate = today.toISOString().split("T")[0]; // Format it as YYYY-
        await dispatch(createInterviewThunk({
            position:title,
            company:'Unavailible',
            location:'Unavilible',
            status:'Pending',
            date:formattedDate,
            type:'Remote'

        }))
        await dispatch(getAllInterviewsThunk())
            await history.push('/interviews')
        // await history.push('/interviews')
    }
    useEffect(() => {
        dispatch(getReactJobsThunk())
    }, [dispatch])
    return (
        <>
            <div className="allJobs-main-cont">

                {reactJobs.map(job => {
                    return (
                        <div className="allJobs-single-cont">
                            <div className="single-job-title">
                                <p>{job.title}</p>

                            </div>
                            <div className="single-job-source">

                                <p>{job.source}</p>
                            </div>
                            <div id="allJobs-btns">
                            <a href={job.url} target="_blank">
  <button>View</button>
</a>
<button onClick={() => handleAddInterview(job.title)}>Add Interview</button>
                                <button>Add to Favorite</button>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ReactJobs