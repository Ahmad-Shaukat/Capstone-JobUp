import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getPythonJobsThunk } from "../../store/python";
import './app.css'

const ShowPythonJobs = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    let pythonJobs = useSelector((store) => store.python)
    pythonJobs = Object.values(pythonJobs)

    useEffect(() => {
        dispatch(getPythonJobsThunk())

    }, [dispatch])

    return (
        <>
            <div className="allJobs-main-cont">

                {pythonJobs.map(job => {
                    return (
                        <div className="allJobs-single-cont">
                            <div className="single-job-title">
                                <p>{job.title}</p>

                            </div>
                            <div className="single-job-source">

                                <p>{job.source}</p>
                            </div>
                            <div className="allJobs-btns">
                                <a href={job.url} target="_blank">
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

export default ShowPythonJobs