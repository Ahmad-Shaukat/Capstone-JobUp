import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CreateFavoriteList from "../CreateFavListModal";
import { useModal } from "../../context/Modal";
import EditFavoriteList from "../EditFavList";
import { getAllListsThunk } from "../../store/favoriteList";
import { useState } from "react";
import "./app.css";

const AllFavriteLists = () => {
  const dispatch = useDispatch();
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showFavLists, setShowFavLists] = useState(true);
  const [editList, setEditList] =useState ({})

  const history = useHistory();
  const user = useSelector((store) => store.session.user);
  let allFavLists = useSelector((store) => store?.favoriteList);
  allFavLists = Object.values(allFavLists);
  console.log(allFavLists, "------------thesea are the favoriteList");
  useEffect(() => {
    dispatch(getAllListsThunk());
  }, [dispatch]);

  const showNewFormHandle = () => {
    setShowNewForm(true);
    setShowEditForm(false);
    setShowFavLists(false);
  };
  const closeNewFormHandle = () => {
    setShowNewForm(false);
    setShowEditForm(false);
    setShowFavLists(true);
  };
  const openeditFormHandle = (list) => {
    setEditList(list)
    setShowEditForm(true);
    setShowNewForm(false);
    setShowFavLists(false);
  };

  const closeEditFormHandle = () => {
    setShowEditForm(false)
    setShowNewForm(false)
    setShowFavLists(true)
  }
  if (!user) {
    history.push("/");
    return null;
  }
  if (allFavLists)
    return (
      <>
        <button onClick={showNewFormHandle}>
          {" "}
          Add List
          {/* <OpenModalButton
            buttonText={"Create List"}
            modalComponent={<CreateFavoriteList />}
          /> */}
        </button>
        <div>
          {showNewForm ? (
            <div>
              <div>
                <CreateFavoriteList closeNewForm={closeNewFormHandle} />
              </div>
            </div>
          ) : null}
        </div>
        {showEditForm ? (<div><EditFavoriteList list={editList} closeEditForm = {closeEditFormHandle} /></div>) : null}
        {showFavLists ? (
          <div>
            {allFavLists.map((list) => {
              return (
                <div key={list.id} className="fav-list-container">
                  <p>List Name: {list.name}</p>
                  {list.jobs.map((job) => {
                    return (
                      <div>
                        <p key={job.id}>{job.position}</p>
                      </div>
                    );
                  })}
                  <button onClick={() => openeditFormHandle(list)}>Edit List</button>
                  {/* <OpenModalButton
                        buttonText={"Edit List"}
                        modalComponent={<EditFavoriteList list={list} />}
                      /> */}
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );

  return (
    <div>
      <div id="all-fav-cont">
        <p>This feature is currently unavailable</p>
      </div>
    </div>
  );
};

// this is the actual feature

export default AllFavriteLists;
