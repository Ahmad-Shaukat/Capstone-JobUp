import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { editListThunk, getAllListsThunk } from "../../store/favoriteList";
import { useModal } from "../../context/Modal";

function EditFavoriteList({list}) {
    // console.log (list)
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [listName, setListName] = useState(list.name)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log (listName)
        await dispatch(editListThunk(list.id, {
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
                <input id="name" type="text" value={listName} onChange={(e) => setListName(e.target.value)}/>
            </div>
            <div>
                <button type="submit">Save Changes</button>
            </div>
        </form>
    </div>
    
    </>

}
export default EditFavoriteList

