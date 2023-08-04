import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { editCommentThunk, getAllInterviewsThunk } from '../../store/interview'
import { useModal } from '../../context/Modal'



function EditCommentForm ({commentId, interviewId, comment}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [newComment, setNewComment] = useState(comment)
    const {closeModal} = useModal()

    const deleteHandle = async (e) => {
        e.preventDefault()
        dispatch(editCommentThunk(commentId, interviewId, {
            comment: newComment
        }))
        dispatch(getAllInterviewsThunk())
        closeModal()
       
    }
    
    return <>
    <div>
        <p>Edit Comment</p>
        <form onSubmit={deleteHandle}>
            <input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <button type='submit'>Save Changes</button>
        </form>
    </div>
    </>
}

export default EditCommentForm