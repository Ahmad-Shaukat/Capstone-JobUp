import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userImage from "../../utilities/user_image.jpg";
import EditUserInfoForm from "../EditUserInfo";
import "./app.css";
import OpenModalButton from "../OpenModalButton";
import { authenticate } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
// import { set } from "date-fns";
// import { useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editPic, seteditPic] = useState(false)
  const [showEdit, setShowEdit] = useState(true)
  let user = useSelector((store) => store.session.user);
  let userProfile = useSelector((store) => store?.userProfile?.profile);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    formData.append('file-to-save', fileInput.files[0]);

    try {
      const response = await fetch(`/api/users/${user.id}/uploadImage`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        seteditPic(false)
        // Handle success as needed
      } else {
        console.error('Image upload failed');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error while uploading image', error);
      // Handle error as needed
    }
  };
  console.log("-----------------------------", userProfile);
  console.log(user, "-------------this is user");
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  if (!user) {
    history.push("/");
    return null;
  }
  const openEdit = () => {
    seteditPic(true)
    setShowEdit(false)
  }
  const handleCancelForm  = () => {
    seteditPic(false)
    setShowEdit(true)
  }

  return (
    <>
      <section id="user-profile">
        <div className="user-profile-img">
          <img
            src={
              user.image
                ? `https://jobshpere-profile-images.s3.amazonaws.com/${user.image}`
                : userImage
            }
          ></img>
          {/* // https://jobshpere-profile-images.s3.amazonaws.com/6d8130902c8f4167b85a0dddab625582.jpg */}
          <div className="image-upload-cont">
            {showEdit ? (

            <div className="edit-imag-btn-cont"><button onClick={openEdit} className="edit-profile-pic-btn">Edit</button> </div>
            ) :null}
            {editPic ? (

            <div className="edit-pic-form-cont">
              <form
                method="PUT"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <input type="file" name="file-to-save"></input>
                <div className="pic-form-btns">
                  <button type="submit">Upload</button>
                <button onClick={handleCancelForm}>Cancel</button>
                </div>
                
              </form>
            </div>
            ) : <div> </div>}
          </div>
        </div>

        <div className="user-profile-info">
          <div>
            <label for="user-first-name">First Name</label>
            <input id="user-first-name" value={user.firstName} disabled></input>
          </div>
          <div>
            <label for="user-first-name">Last Name</label>
            <input id="user-first-name" value={user.last_name} disabled></input>
          </div>
          <div>
            <label for="user-career">Career</label>
            <input id="user-career" value={user.career} disabled></input>
          </div>
          <div>
            <label for="user-location">Location</label>
            <input id="user-location" value={user.location} disabled></input>
          </div>
          <div>
            <label for="user-username">Username</label>
            <input id="user-username" value={user.username} disabled></input>
          </div>
          <div>
            <label for="user-email">Email</label>
            <input id="user-email" value={user.email} disabled></input>
          </div>
          <div>
            <label for="user-bio-label">Bio</label>
            <textarea id="user-email" value={user.bio} disabled></textarea>
          </div>
        <div>
          <button className="user-info-edit-btn">
            <OpenModalButton
              buttonText={"Edit Info"}
              modalComponent={<EditUserInfoForm user={user} />}
            />
          </button>
        </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
