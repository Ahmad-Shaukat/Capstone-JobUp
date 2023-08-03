import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addCommentThunk } from "../../store/interview";
import { getAllInterviewsThunk } from "../../store/interview";
import OpenModalButton from "../OpenModalButton";
import DeleteComment from "../DeleteCommentModal";


function InterviewDetail ({}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams() 
    const [comment, setComment] = useState('')
    let interview = useSelector((store) => store?.interview[id])
    let user = useSelector((store) => store?.session['user'])
    console.log (user)
    console.log (comment, '---------this is the initial comment')
    useEffect(() => {
        dispatch(getAllInterviewsThunk())
    }, [dispatch, id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addCommentThunk(interview.id, {
            comment: comment
        }))
        await dispatch(getAllInterviewsThunk())
        console.log (comment, '--------------this is the comment before')
        await setComment('')
        console.log (comment, '---------------this is comment after')
        
    }
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
                return <>
                 <div key={comm.id}> 
                <p>{comm['user'].username} {comm.comment}</p> 
                {user.id === comm['user'].id && (
                    <button>Edit</button>
                    
                )}    
                {user.id === comm['user'].id && (
                    <button>
                        <OpenModalButton 
                            buttonText={'Delete'}
                            modalComponent={
                                <DeleteComment 
                                    interviewId={interview.id} commentId={comm.id}
                                />
                            }
                        />
                    </button>
                    
                )}  
                   
                </div>
                </>
            })}
            <form onSubmit={handleSubmit}>
                <input placeholder=" post a comment" onChange={(e) => setComment(e.target.value)} value={comment} />
                <button type="submit">Post</button>
            </form>
        </div>
    
    
    </> 
    }
    return <>
    <p>Loading...</p>
    </>
    


}


export default InterviewDetail