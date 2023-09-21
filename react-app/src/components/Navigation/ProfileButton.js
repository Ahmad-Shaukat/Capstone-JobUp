import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { AiFillCaretDown } from 'react-icons/ai'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { clearInterview } from "../../store/interview";
import { clearfavlist } from "../../store/favoriteList";
// import { clearInterview } from "../../store/interview";
import { clearUsers } from "../../store/user";
import { clearAllInterviews } from "../../store/allinterviews";
import { clearReactJobs } from "../../store/reactJobs";
import { clearFullStack } from "../../store/fullstack";
import { clearDataEngineerJobs } from "../../store/dataEngineer";
import { clearPython } from "../../store/python";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    // dispatch(clearAllInterviews())
    dispatch(clearInterview())
    dispatch(clearfavlist())
    dispatch(clearUsers())
    dispatch(clearDataEngineerJobs())
    dispatch(clearFullStack())
    dispatch(clearPython())
    dispatch(clearReactJobs())
    // dispatch(clearProfile())
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  

  return (
    <>
      <button onClick={openMenu} className="profile-btn">
        <i className="fas fa-user-circle" style={{ marginRight: '5px' }} />
        {user && <span className="profile-btn-user">{user.username}</span>}

        <span className="profile-down"><AiFillCaretDown /></span>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-btns-container">
              <div className="profile-btn-logout">
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div className="profile-btn-profile">
                <NavLink path to='/user'><button >Profile</button></NavLink>
              </div>


            </div>
            {/* <li>{user.username}</li>
            <li>{user.email}</li>
            <li>

            </li> */}
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
