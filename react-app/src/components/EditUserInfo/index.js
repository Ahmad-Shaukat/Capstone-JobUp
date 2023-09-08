import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EditUserThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./app.css";

function EditUserInfoForm({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [id, setId] = useState(user.id);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [last_name, setLast_name] = useState(user.last_name);
  const [career, setCareer] = useState(user.career);
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);
  const [errors, setErrors] = useState({});
  console.log(user, "--------------tesing user errror");

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLast_name(e.target.value);
  };
  const updateCareer = (e) => {
    setCareer(e.target.value);
  };
  const updateLocation = (e) => {
    setLocation(e.target.value);
  };
  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const onSubmitHandle = async (e) => {
    const updatedInfo = {
      username: username,
      email: email,
      firstName: firstName,
      last_name: last_name,
      career: career,
      location: location,
      bio: bio,
    };
    e.preventDefault();
    console.log(updatedInfo);
    await dispatch(EditUserThunk(id, updatedInfo));
    closeModal();
  };

  return (
    <>
      <div className="edit-user-mod-cont">
        <h3>Edit Profile</h3>
        <form onSubmit={onSubmitHandle} className="edit-user-info-mod-form">
          <div className="edit-user-info-mod-form-cont">
            <div>
              <div className="usr-edit-mod-lab-inp">
                <label for="username">Username</label>
                <input
                  placeholder="Username:"
                  value={username}
                  onChange={updateUsername}
                ></input>
              </div>
            </div>
            <div>
              <div className="usr-edit-mod-lab-inp">
                <label for="email">Email</label>
                <input
                  placeholder="Email"
                  value={email}
                  onChange={updateEmail}
                ></input>
              </div>
            </div>

            <div>
              <div className="usr-edit-mod-lab-inp">
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={updateFirstName}
                ></input>
              </div>
            </div>
            <div className="testee">
              <div className="usr-edit-mod-lab-inp">
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  value={last_name}
                  onChange={updateLastName}
                ></input>
              </div>
            </div>
            <div>
              <div className="usr-edit-mod-lab-inp">
                <label for="career">Career</label>
                <input
                  placeholder="Career"
                  value={career}
                  onChange={updateCareer}
                ></input>
              </div>
            </div>
            <div>
              <div className="usr-edit-mod-lab-inp">
                <label>Location</label>
                <input
                  placeholder="Location"
                  value={location}
                  onChange={updateLocation}
                ></input>
              </div>
            </div>
            <div>
              <div className="usr-edit-mod-lab-bio">
                <label>Bio:</label>
                <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={updateBio}
                ></textarea>
              </div>
            </div>
            <div className="edit-user-info-btn">
              <button type="submit">Save changes</button>
              <button>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserInfoForm;
