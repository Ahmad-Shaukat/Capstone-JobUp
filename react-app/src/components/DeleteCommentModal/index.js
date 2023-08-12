import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteCommentThunk, getAllInterviewsThunk } from '../../store/interview';
import { useModal } from '../../context/Modal';
import { deleteUserCommentThunk } from '../../store/allinterviews';
import { getAllUsersInterviewThunk } from '../../store/allinterviews';
import './app.css'


function DeleteComment({ interviewId, commentId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    console.log(interviewId)
    console.log(commentId)

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('deleting comment')
        await dispatch(deleteUserCommentThunk(interviewId, commentId))
        await getAllUsersInterviewThunk()
        await dispatch(getAllInterviewsThunk())
        closeModal()
    }


    return <>
        <main className='del-comm-con'>
            <div className='del-comm-head'>
                <p>Are you sure you want to delete this comment?</p>

            </div>
            <div className='del-comm-btns'>
                <button onClick={handleDelete} className='del-comm-yes-btn'>
                    Yes
                </button>

                <button onClick={closeModal} className='del-comm-can'>
                    Cancel
                </button>
            </div>
        </main>

    </>
}

export default DeleteComment
