import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createListThunk } from "../../store/favoriteList";
import { getAllListsThunk } from "../../store/favoriteList";
import { useModal } from "../../context/Modal";
function CreateFavoriteList () {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [listName, setListName] = useState('')
    
    const updateListName = (e) => setListName(e.target.value)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log (listName)
        await dispatch(createListThunk({
            name:listName
        }))
        await dispatch(getAllListsThunk())
        closeModal()
    }

    return <>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for='name'>List Name</label>
                    <input id="name" type="text" placeholder="enter name" onChange={updateListName}></input>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </>
}
export default CreateFavoriteList

