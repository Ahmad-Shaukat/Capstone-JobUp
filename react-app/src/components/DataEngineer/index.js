import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getPythonJobsThunk } from "../../store/python";
import { getDataEngineerJobsThunk } from "../../store/dataEngineer";
import './app.css'

const DataEngineerJobs = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    let dataEgJobs = useSelector((store) => store.dataEngineer)
    dataEgJobs = Object.values(dataEgJobs)

    useEffect(() => {
        dispatch(getDataEngineerJobsThunk())

    }, [dispatch])

    return (
        <>
            <div className="allJobs-main-cont">

                {dataEgJobs.map(job => {
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

export default DataEngineerJobs