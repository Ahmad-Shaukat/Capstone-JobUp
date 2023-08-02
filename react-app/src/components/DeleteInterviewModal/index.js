import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteInterviewThunk } from "../../store/interview";
import { useModal } from "../../context/Modal";

function DeleteInterview({interview}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()


    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteInterviewThunk(interview))
        closeModal()
    }

    return <>
    <h4>Delete Interview?</h4>
    <p>are you sure you want to delete this interview</p>
    <button type="submit" onClick={handleDelete}>Delete</button>
    
    </>

}

export default DeleteInterview