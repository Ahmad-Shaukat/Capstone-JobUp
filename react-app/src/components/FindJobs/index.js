
import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useState } from "react"
import './app.css'



const FindJobs = () => {
    const history = useHistory()
    let user = useSelector((store) => store.session['user'])

    if(!user){
        history.push('/')
        return null
    }
    return (
        <div className="all-jobs-cont">
            <p>This feature is currently unavailable</p>
        </div>
    )
}

export default FindJobs