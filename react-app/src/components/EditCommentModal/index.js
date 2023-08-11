import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editCommentThunk, getAllInterviewsThunk } from '../../store/interview'
import { useModal } from '../../context/Modal'
import './app.css'



function EditCommentForm({ commentId, interviewId, comment }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [newComment, setNewComment] = useState(comment)
    const { closeModal } = useModal()
    const [errors, setErrors] = useState({})

    const deleteHandle = async (e) => {
        e.preventDefault()
        function checkErrors() {
            let allErrors = {}
            if (newComment === '') {
                allErrors['minError'] = "Comment can't not be empty"
            }
            if (newComment.length > 300) {
                allErrors['maxError'] = "Comment can't be more then 300 Character"
            }
            if (Object.values(allErrors).length > 0) {
                setErrors(allErrors)
                console.log(errors)
                return true

            } else {
                return false
            }


        }
        if (checkErrors() === false) {
             await dispatch(editCommentThunk(commentId, interviewId, {
            comment: newComment
        }))
        await dispatch(getAllInterviewsThunk())
        closeModal()
        }
         

       

    }

    return <>
    
        <div className='edit-comment-cont'>
            <div className='edit-comm-heading'>
            <p>Edit Comment</p>

            </div>
            <div className='edit-comm-err'>
                {errors && errors.maxError && <p>{errors.maxError}</p>}
                {errors && errors.minError && <p>{errors.minError}</p>}
            </div>
            <div className='edit-comm-cont'>
            <form onSubmit={deleteHandle} className='edit-comm-form'>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <div className='edit-comm-btns'>
                <button type='submit'>Save Changes</button>
                <button onClick={() => closeModal()}>Cancel</button>
                </div>
            </form>

            </div>
        </div>
    
        
    </>
}

export default EditCommentForm