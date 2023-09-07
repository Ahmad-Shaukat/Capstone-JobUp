import React from "react"
import logo from '../../utilities/logo.png'
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './app.css'
import { useSelector } from "react-redux"
import { BiSolidBarChartAlt2 } from 'react-icons/bi'
import { BsCalendar4Range } from 'react-icons/bs'
import { BsFillClipboard2PlusFill } from 'react-icons/bs'
import { FaSearchDollar } from 'react-icons/fa'
import { BsSave2Fill } from 'react-icons/bs'
import { useState } from "react"





const Sidebar = ({isLoaded}) => {
    const [showStats, setShowStats] = useState(true)
    const [showInterviews, setShowInterviews] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showFavs, setShowFavs] = useState(false)
    const [showJobs, setShowJobs] = useState(false)
    const history = useHistory()


    const handleStats = () => {
        setShowStats(true)
        setShowInterviews(false)
        setShowForm(false)
        setShowFavs(false)
        setShowJobs(false)
    }
    const handleInterviews = () => {
        setShowStats(false)
        setShowInterviews(true)
        setShowForm(false)
        setShowFavs(false)
        setShowJobs(false)
    }
    const handleForm= () => {
        setShowStats(false)
        setShowInterviews(false)
        setShowForm(true)
        setShowFavs(false)
        setShowJobs(false)
    }
    const handleFavs = () => {
        setShowStats(false)
        setShowInterviews(false)
        setShowForm(false)
        setShowFavs(true)
        setShowJobs(false)
    }
    const handleJobs = () => {
        setShowStats(false)
        setShowInterviews(false)
        setShowForm(false)
        setShowFavs(false)
        setShowJobs(true)
    }

    const sessionUser = useSelector(state => state.session.user);
    // if (!sessionUser) {
    //     history.push('/')
    //     return null
    // }
    return (
        <div className="sidebar-container">
            {isLoaded && (
                <div className="sidbar-main">
                <div className="logo-cont">
                    <NavLink exact to='/'>
                        <img src={logo} className="logo-img" />
                    </NavLink>
    
    
                </div>
                <div className="sidbar-links">
                    <div className="stats-cont" id={showStats? "option-selected": ""}>
                        <div className="slide">
                            <NavLink exact to='/hello' className='stats-nav' onClick={handleStats}><BiSolidBarChartAlt2 className="stats-logo"/> Stats </NavLink>
                        </div>
    
    
                    </div>
                    <div className="stats-cont" id={showInterviews? "option-selected": ""}>
                        <div className="slide">
                            <NavLink exact to='/interviews' className='stats-nav' onClick={handleInterviews}> <BsCalendar4Range className="stats-logo"  />All Interviews</NavLink>
                        </div>
    
                    </div>
    
    
                    <div className="stats-cont" id={showForm? "option-selected": ""}>
                        <div className="slide">
                            <NavLink exact to='/newInterview' className='stats-nav' onClick={handleForm}> <BsFillClipboard2PlusFill className="stats-logo" />Add Interview</NavLink>
                        </div>
    
                    </div>
                    <div className="stats-cont" id={showJobs? "option-selected": ""}>
                        <div className="slide">
                            <NavLink exact to='/findjobs' className='stats-nav' onClick={handleJobs}> <FaSearchDollar className="stats-logo" />Find Jobs</NavLink>
                        </div>
    
                    </div>
                    <div className="stats-cont" id={showFavs? "option-selected": ""}>
                        <div className="slide">
                            <NavLink exact to='/favlists' className='stats-nav' onClick={handleFavs}><BsSave2Fill className='stats-logo' />
                                Favorites
                            </NavLink>
                        </div>
    
                    </div>
                </div>
    
            </div>
            )}
        </div>
        // <div className="sidbar-main">
        //     <div className="logo-cont">
        //         <NavLink exact to='/'>
        //             <img src={logo} className="logo-img" />
        //         </NavLink>


        //     </div>
        //     <div className="sidbar-links">
        //         <div className="stats-cont">
        //             <div className="slide">
        //                 <NavLink exact to='/hello' className='stats-nav'><BiSolidBarChartAlt2 className="stats-logo" /> Stats </NavLink>
        //             </div>


        //         </div>
        //         <div className="stats-cont" >
        //             <div className="slide">
        //                 <NavLink exact to='/interviews' className='stats-nav'> <BsCalendar4Range className="stats-logo" />All Interviews</NavLink>
        //             </div>

        //         </div>


        //         <div className="stats-cont">
        //             <div className="slide">
        //                 <NavLink exact to='/newInterview' className='stats-nav'> <BsFillClipboard2PlusFill className="stats-logo" />Add Interview</NavLink>
        //             </div>

        //         </div>
        //         <div className="stats-cont">
        //             <div className="slide">
        //                 <NavLink exact to='/findjobs' className='stats-nav'> <FaSearchDollar className="stats-logo" />Find Jobs</NavLink>
        //             </div>

        //         </div>
        //         <div className="stats-cont">
        //             <div className="slide">
        //                 <NavLink exact to='/favlists' className='stats-nav'><BsSave2Fill className='stats-logo' />
        //                     Favorites
        //                 </NavLink>
        //             </div>

        //         </div>
        //     </div>

        // </div>

    )
}

export default Sidebar