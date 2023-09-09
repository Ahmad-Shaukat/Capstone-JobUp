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
import { BsList } from "react-icons/bs";
import { FaArrowPointer } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { deleteListThunk } from "../../store/favoriteList";
import {AiFillThunderbolt} from 'react-icons/ai'
import { addJobThunk } from "../../store/favoriteList";
import { deleteJobThunk } from "../../store/favoriteList";
 

const AllFavriteLists = ({options, favJob, closeFavFunc, stats}) => {
  const dispatch = useDispatch();
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showFavLists, setShowFavLists] = useState(true);
  const [editList, setEditList] = useState({});
  // console.log (options, '--------this is options value')

  const history = useHistory();
  const user = useSelector((store) => store.session.user);
  let allFavLists = useSelector((store) => store?.favoriteList);
  allFavLists = Object.values(allFavLists);
  
  // console.log(allFavLists, "------------thesea are the favoriteList");
  useEffect(async () => {
    await dispatch(getAllListsThunk());
  }, [dispatch]);
  const addToFavHandle = async (listId) => {
    await dispatch(addJobThunk(listId, favJob))
    await dispatch(getAllListsThunk())
    closeFavFunc()
  }
  const deleteListHandle = async (list) => {
    await dispatch(deleteListThunk(list))
    // await dispatch(getAllListsThunk())
  }

  const delJobHandle = async(jobId, listId) => {
    await dispatch(deleteJobThunk(listId, jobId))
    await dispatch(getAllListsThunk())
  }

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
    setEditList(list);
    setShowEditForm(true);
    setShowNewForm(false);
    setShowFavLists(false);
  };

  const closeEditFormHandle = () => {
    setShowEditForm(false);
    setShowNewForm(false);
    setShowFavLists(true);
  };
  if (!user) {
    history.push("/");
    return null;
  }
  if (allFavLists)
    return (
      <>
        {/* <div>
          {showNewForm ? (
            <div>
              <div>
                <CreateFavoriteList closeNewForm={closeNewFormHandle} />
              </div>
            </div>
          ) : null}
        </div> */}
        
        {showEditForm ? (
          <div className="fav-list-edit-form">
            <p className="form-edit-list-heading">Edit List</p>
            <EditFavoriteList
              list={editList}
              closeEditForm={closeEditFormHandle}
            />
          </div>
        ) : null}

        
        {showFavLists ? (
          <div className="fav-list-container">
            <p id="fav-list-heading">Favorites</p>
            {allFavLists.map((list) => {
              return (
                <div key={list.id} className="fav-list-single">
                  <div className="fav-list-name-edit-cont">
                    <p className="fav-list-name">
                      <AiFillThunderbolt className="fav-list-name-icon" /> {list.name}
                    </p>
                    {options ? (
                      <div> 
                        <button onClick= {() => addToFavHandle(list.id)}>Add To List</button>
                        {/* <p>{favJob.title}</p> */}
                      </div>
                    ): stats ? (<div> </div>):(

                    <div className="fav-single-icons">

                    <button onClick={() => openeditFormHandle(list)}>
                      Edit List
                    </button>
                    <MdDeleteForever className="fav-list-del" onClick={() => deleteListHandle(list)}/>
                    </div>
                    )}
                  </div>

                  {list.jobs.map((job) => {
                    return (
                      <div className="fav-job-container">
                        <p key={job.id}>{job.title}</p>
                        {options ? (<div> </div>):stats
                        
                        } 
                        <div className="fav-job-icons">
                        {/* <FaArrowPointer className="fav-job-arrow"/> */}
                        <a href={job.url} className="fav-job-view-btn"target="_blank" >View</a>
                        <MdDeleteForever onClick={() => delJobHandle(job.id, list.id)} className="fav-list-del"/>
                        </div>
                      </div>
                    );
                  })}
                  {/* <button onClick={() => openeditFormHandle(list)}>Edit List</button> */}
                </div>
              );
            })}
            {
              options ? (<div> </div>):(
                
            <div className="fav-list-add-btn-cont">
                <button onClick={showNewFormHandle}>
         
         Add List
         
       </button></div>
              )
            }
          </div>
        ) : null}
        <div>
          {showNewForm ? (
            <div>
              <div>
                <CreateFavoriteList closeNewForm={closeNewFormHandle} />
              </div>
            </div>
          ) : stats ? (<div> </div>):null}
        </div>
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
