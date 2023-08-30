import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userImage from "../../utilities/user_image.jpg";
import EditUserInfoForm from "../EditUserInfo";
import "./app.css";
import OpenModalButton from "../OpenModalButton";
import { authenticate } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  let user = useSelector((store) => store.session.user);
  let userProfile = useSelector((store) => store?.userProfile?.profile);
  console.log("-----------------------------", userProfile);
  console.log(user, "-------------this is user");
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  if (!user) {
    history.push('/')
    return null
}

  return (
    <>
      <section id="user-profile">
        <div className="user-profile-img">
          <img src={userImage}></img>
        </div>

        <div className="user-profile-info">
          <div>
            <label for="user-first-name">First Name</label>
            <input id="user-first-name" value={user.firstName}disabled></input>
          </div>
          <div>
            <label for="user-first-name">Last Name</label>
            <input id="user-first-name" value={user.last_name}disabled></input>
          </div>
          <div>
            <label for="user-career">Career</label>
            <input id="user-career" value={user.career}disabled></input>
          </div>
          <div>
            <label for="user-location">Location</label>
            <input id="user-location" value={user.location}disabled></input>
          </div>
          <div>
            <label for="user-username">Username</label>
            <input id="user-username" value={user.username}disabled></input>
          </div>
          <div>
            <label for="user-email">Email</label>
            <input id="user-email" value={user.email} disabled></input>
          </div>
          <div>
            <label for="user-bio-label">Bio</label>
            <textarea id="user-email" value={user.bio} disabled></textarea>
          </div>
        </div>
        <div>
          <button className="user-info-edit-btn">
            <OpenModalButton
              buttonText={"Edit Info"}
              modalComponent={<EditUserInfoForm user={user} />}
            />
          </button>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
