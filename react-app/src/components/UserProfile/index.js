import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userImage from '../../utilities/user_image.jpg'
import './app.css'

const UserProfile = () => {
    let user = useSelector((store) => store.session.user)
    let userProfile = useSelector((store) => store?.userProfile?.profile)
    console.log ('-----------------------------', userProfile)
    console.log (user, '-------------this is user') 

    return <>
    <section id="user-profile">
        <div className="user-profile-img">
            <img src={userImage}></img>
        </div>

        <div className="user-profile-info">
            <div>
                <label for="user-first-name">First Name</label>
                <input id="user-first-name" value={userProfile?.first_name}></input>
            </div>
            <div>
                <label for="user-first-name">Last Name</label>
                <input id="user-first-name" value={userProfile?.last_name}></input>
            </div>
            <div>
                <label for='user-career'>Career</label>
                <input id="user-career" value={userProfile?.career}></input>
            </div>
            <div>
                <label for='user-location'>Location</label>
                <input id="user-location" value={userProfile?.location}></input>
            </div>
            <div>
                <label for='user-username'>Username</label>
                <input id="user-username" value={user.username}></input>
            </div>
            <div>
                <label for='user-email'>Email</label>
                <input id="user-email" value={user.email}></input>

        </div>
            </div>
            <div>
                <button className="user-info-edit-btn">Edit Info</button>
            </div>
    </section>
    <h3>Profile</h3>
    <p>{user.username}</p>
    <p>{user.email}</p>
    </>
}

export default UserProfile