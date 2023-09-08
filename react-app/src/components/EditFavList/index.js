import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { editListThunk, getAllListsThunk } from "../../store/favoriteList";
import { useModal } from "../../context/Modal";
import './app.css'

function EditFavoriteList({list, closeEditForm}) {
    // console.log (list)
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const [listName, setListName] = useState(list.name)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log (listName)
        const checkErrors = () => {
            let allErros = {}

            if (listName.length<3) {
                allErros['lengthError'] = 'Name must be more then 3 characters'
            }
           if (Object.keys(allErros).length>0) {
            setErrors(allErros)
            return true
           }
           return false
        } 
        if (Object.keys(errors).length>0) {
            return
        }
        if (checkErrors()===false) {

            await dispatch(editListThunk(list.id, {
                name:listName
            }))
            
            
            await dispatch(getAllListsThunk())
            closeEditForm()
        }

    }

    return <>
    <div className="edit-fav-list-cont">
        <form onSubmit={handleSubmit}>
            <div className="edit-fav-err-cont">
                {errors && errors.lengthError&& <p style={{ color: "red" }} id='edit-fav-err'>{errors.lengthError}</p>}
            </div>
            <div className="edit-fav-input">
                <label for='name'>Name:</label>
                <input id="name" type="text" value={listName} onChange={(e) => setListName(e.target.value)}/>
            </div>
            <div className="edit-fav-btns">
                <button type="submit" className="edit-fav-save-btn">Save Changes</button>
                
         <button onClick={() => closeEditForm()} className="edit-fav-canc-btn">Cancel</button>
            </div>
        </form>
        
    </div>
    
    </>

}
export default EditFavoriteList

