


import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersThunk } from "../../store/user";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './app.css'
import { getReactJobsThunk } from "../../store/reactJobs";
import { createInterviewThunk } from "../../store/interview";
import { getAllInterviewsThunk } from "../../store/interview";
import {BiLinkExternal} from 'react-icons/bi'
import {MdFavorite} from 'react-icons/md'
import {BsFillCalendarPlusFill} from 'react-icons/bs'
import AllFavriteLists from "../AllFavoriteList";
import { useState } from "react";
import { getPythonJobsThunk } from "../../store/python";


const ShowPythonJobs = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [favOptions, setFavOptions] = useState(false)
    const [addFav, setAddFav] = useState({})
    // const favOptions = false
    const user = useSelector((store) => store.session.user)
    const [showFavLists, setShowFavLists] = useState(false)
    const [showJobs, setShowJobs] = useState(true)
    let pythonJobs = useSelector((store) => store.python)
    pythonJobs = Object.values(pythonJobs)
    const handleFavorite = (job) => {
        job.title = job.title.trim()
        console.log (job, '-----------this is the trimmed version'
            )
        setAddFav(job)
        setFavOptions(true)
        setShowJobs(false)
        setShowFavLists(true)
    } 
    const closeFav = () => {
        setShowJobs(true)
        setShowJobs(true)
    }
    
    const handleAddInterview = async (title) => {
        // e.preventDefault()
        const today = new Date(); // Get today's date
    const formattedDate = today.toISOString().split("T")[0]; // Format it as YYYY-
    const formattedTitle = title.trim()
        await dispatch(createInterviewThunk({
            position:formattedTitle,
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
            {showJobs ? (

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
                            <div id="allJobs-btns">
                            <a href={job.url} target="_blank">
  <button><BiLinkExternal/></button>
</a>
<button onClick={() => handleAddInterview(job.title)}><BsFillCalendarPlusFill /></button>
                                <button onClick={() => handleFavorite(job)}><MdFavorite /></button>
                            </div>

                        </div>
                    )
                })}
            </div>
            ):null}
            {showFavLists ? (
            <div>
                <AllFavriteLists options = {favOptions} favJob = {addFav} closeFavFunc = {closeFav}/>
            </div>

            ):null}
            
        </>
    )
}

// const ShowPythonJobs = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const user = useSelector((store) => store.session.user)
//     let pythonJobs = useSelector((store) => store.python)
//     pythonJobs = Object.values(pythonJobs)
//     const handleAddInterview = async (title) => {
//         // e.preventDefault()
//         const today = new Date(); // Get today's date
//     const formattedDate = today.toISOString().split("T")[0]; // Format it as YYYY-
//         await dispatch(createInterviewThunk({
//             position:title,
//             company:'Unavailible',
//             location:'Unavilible',
//             status:'Pending',
//             date:formattedDate,
//             type:'Remote'

//         }))
//         await dispatch(getAllInterviewsThunk())
//             await history.push('/interviews')
//         // await history.push('/interviews')
//     }

//     useEffect(() => {
//         dispatch(getPythonJobsThunk())

//     }, [dispatch])

//     return (
//         <>
//             <div className="allJobs-main-cont">

//                 {pythonJobs.map(job => {
//                     return (
//                         <div className="allJobs-single-cont">
//                             <div className="single-job-title">
//                                 <p>{job.title}</p>

//                             </div>
//                             <div className="single-job-source">

//                                 <p>{job.source}</p>
//                             </div>
//                             <div className="allJobs-btns">
//                                 <a href={job.url} target="_blank">
//                                     <button>View</button>
//                                 </a>
//                                 <button onClick={() => handleAddInterview(job.title)}>Add Interview</button>
//                                 <button>Add to Favorite</button>
//                             </div>

//                         </div>
//                     )
//                 })}
//             </div>
//         </>
//     )
// }

export default ShowPythonJobs