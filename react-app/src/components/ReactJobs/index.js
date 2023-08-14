import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersThunk } from "../../store/user";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './app.css'
import { getReactJobsThunk } from "../../store/reactJobs";



const ReactJobs = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    let reactJobs = useSelector((store) => store.reactJobs)
    reactJobs = Object.values(reactJobs)
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
                            <div className="allJobs-btns">
                            <a href="https://www.google.com" target="_blank">
  <button>View</button>
</a>
                                <button>Add Interview</button>
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