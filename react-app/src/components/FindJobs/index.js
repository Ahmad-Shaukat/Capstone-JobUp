
import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"



const FindJobs = () => {
    const history = useHistory()
    let user = useSelector((store) => store.session['user'])

    if(!user){
        history.push('/')
        return null
    }
    return (
        <div>All jobs go here</div>
    )
}

export default FindJobs