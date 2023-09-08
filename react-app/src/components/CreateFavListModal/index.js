import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createListThunk } from "../../store/favoriteList";
import { getAllListsThunk } from "../../store/favoriteList";
import "./app.css";
import { useModal } from "../../context/Modal";
function CreateFavoriteList({ closeNewForm }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [listName, setListName] = useState("");
  const [errors, setErrors] = useState({});

  const updateListName = (e) => setListName(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(listName);

    const checkErrros = () => {
      let errorList = {};
      if (listName.length < 3) {
        errorList["lengthError"] = "List name must be longer then 3 characters";
      }
      if (Object.keys(errorList).length > 0) {
        setErrors(errorList);
        return true;
      }
      return false;
    };
    if (!checkErrros()) {
      await dispatch(
        createListThunk({
          name: listName,
        })
      );
      await dispatch(getAllListsThunk());
      closeNewForm();
    }
  };

  return (
    <>
      <div className="cre-fav-cont">
        <p>Create List</p>
        <div className="cre-fav-error">
          {errors && errors.lengthError && (
            <p style={{ color: "red" }}>{errors.lengthError}</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="name"> Name: </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              onChange={updateListName}
            ></input>
          </div>
          <div className="edit-fav-btns-cont">
            <button type="submit" className="cre-fav-sub-btn">
              Submit
            </button>
            <button className="cre-fav-can-btn" onClick={() => closeNewForm()}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateFavoriteList;
