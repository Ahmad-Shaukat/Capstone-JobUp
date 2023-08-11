import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { deleteCommentThunk, getAllInterviewsThunk } from '../../store/interview';
import { useModal } from '../../context/Modal';
import { deleteUserCommentThunk } from '../../store/allinterviews';
import { getAllUsersInterviewThunk } from '../../store/allinterviews';


function DeleteComment ({interviewId, commentId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    console.log (interviewId)
    console.log (commentId)

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log ('deleting comment')
        await dispatch(deleteUserCommentThunk(interviewId, commentId))
        await getAllUsersInterviewThunk()
        await dispatch(getAllInterviewsThunk())
        closeModal()
    }


    return <>
    
    
    <p>Are you sure you want to delete this comment?</p>
    <div>
        <button onClick={handleDelete}>
            Yes
        </button>

        <button onClick={closeModal}>
            Cancel
        </button>
    </div>
    </>
}

export default DeleteComment
