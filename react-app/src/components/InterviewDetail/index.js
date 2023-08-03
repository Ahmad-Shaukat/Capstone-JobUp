import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function InterviewDetail ({}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams() 
    let interview = useSelector((store) => store?.interview[id])
    // console.log (interview[1],'---------testing state')
    if (interview) {
       return <>
    
        <h3>Interview Details</h3>
        <div>
            <p>{interview.company}</p>
            <p>{interview.position}</p>
            <p>{interview.location}</p>
            <p>{interview.status}</p>
            <p>{interview.date}</p>
        </div>
        
        <div>
            <h3>Discussion</h3>
            {interview.comments.map((comm) => {
                return (
                    <p>{comm['user'].username} {comm.comment}</p>
                )
            })}
        </div>
    
    
    </> 
    }
    return <>
    <p>Loading...</p>
    </>
    


}


export default InterviewDetail