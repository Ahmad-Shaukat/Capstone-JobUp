import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteInterviewThunk } from "../../store/interview";
import { useModal } from "../../context/Modal";
import './app.css'

function DeleteInterview({ interview }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()


    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteInterviewThunk(interview))
        closeModal()
    }

    return <>
        <div className="del-int-main-cont">
            <div className="del-int-heading">
                <p>Delete Interview</p>
            </div>
            <div className="del-int-text">
                <p>Are you sure you want to delete this interview ?</p>

            </div>
            <div className="del-int-btn">
                <button type="submit" onClick={handleDelete} className="del-int-del-btn">Delete</button>
                <button className="del-int-can-btn" onClick={() => closeModal()}>Cancel</button>
                

            </div>
        </div>

    </>

}

export default DeleteInterview