
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import { useState } from "react"
import './app.css'
import { useState } from "react"
import ReactJobs from "../ReactJobs"
import FullStack from "../FullstackJobs"
import ShowPythonJobs from "../PythonJobs"



const FindJobs = () => {
    const history = useHistory()
    const [reactJobs, setReactJobs] = useState('')
    const [fullstackJobs, setFullstackJobs] = useState('')
    const [pythonJobs, setPythonJobs] = useState('')
    const [dataJobs, setDataJobs] = useState('')
    let user = useSelector((store) => store.session['user'])

    function handleReact() {
        setReactJobs(true)
        setFullstackJobs(false)
        setPythonJobs(false)
        setDataJobs(false)
    }


    function handleFullstack() {
        setReactJobs(false);
        setFullstackJobs(true);
        setPythonJobs(false)
        setDataJobs(false)
    }
    function handlePython() {
        setReactJobs(false);
        setFullstackJobs(false);
        setDataJobs(false)
        setPythonJobs(true)
    }
    function handleData() {
        setReactJobs(false);
        setFullstackJobs(false);
        setPythonJobs(false)
        setDataJobs(true)
    }
    // useEffect(() => {

    // })


    if (!user) {
        history.push('/')
        return null
    }
    return (
        <div className="all-jobs-cont">
            <div className="jobs-btns">

            <button
                    onClick={handleReact}
                    className={reactJobs ? "clicked" : "notClicked"}
                >
                    React Jobs
                </button>
                <button 
                onClick={handleFullstack}
                className={fullstackJobs ? "clicked" : "notClicked"}
                >FullStack Jobs</button>
                <button
                onClick={handlePython}
                className={pythonJobs ? "clicked" : "notClicked"}
                >Python Jobs</button>
                <button 
                onClick={handleData}
                className={dataJobs ? "clicked" : "notClicked"}
                >Data Engineer</button>
            </div>
            <div>
            {reactJobs && <ReactJobs />}
            {fullstackJobs && <FullStack />}
            {pythonJobs && <ShowPythonJobs /> }

            </div>


        </div>
    )
}

export default FindJobs