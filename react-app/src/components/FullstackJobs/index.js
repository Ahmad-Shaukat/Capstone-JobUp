import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersThunk } from "../../store/user";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './app.css'
import { getFullStackJobs, getFullStackJobsThunk } from "../../store/fullstack";





const FullStack = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    let fullStackJobs = useSelector((store) => store.fullstack)
    fullStackJobs = Object.values(fullStackJobs)
    // for (let i = 0; i < fullStackJobs.length; i++) {
    //     if (fullStackJobs[i].title && fullStackJobs[i].title.startsWith("\\")) {
    //         fullStackJobs[i].title = "unavailable";
    // }
    // }
    console.log(fullStackJobs, '-------------these are all the fullstack jobs')
    useEffect(() => {
        dispatch(getFullStackJobsThunk())
    }, [dispatch])

    return (
        <>
            <div className="allJobs-main-cont">

                {fullStackJobs.map(job => {
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
export default FullStack