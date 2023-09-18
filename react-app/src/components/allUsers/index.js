import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersThunk } from "../../store/user";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDeferredValue } from "react";
import './app.css'
import userImage from '../../utilities/user_image.jpg'
const AllUsers = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector((store) => store.session.user)
    let users = useSelector((store) => store.user)

    users = Object.values(users)
    console.log(users, '---------------users')
    useEffect(async () =>
        dispatch(getAllUsersThunk()), [dispatch]
    )
    const filtered_users = users.filter(user => user.id !== currentUser.id);

    console.log(filtered_users, '---------------filtered users')
    if (!currentUser) {
        history.push('/')
        return null
    }



    if (users) {
        return <>
        <div className="main-cont-all-users">

        <h1 className="all-users-heading">Discover People</h1>
            <div className="allusers-main-cont">

                {filtered_users.map((user) => {
                    return (
                        
                        <div key={user.id} className="allusers-single-cont" >
                                <div className="allusers-inner-content">

                                <div className="allusers-img-cont">
                                <img
            src={
              user.image
                ? `https://jobshpere-profile-images.s3.amazonaws.com/${user.image}`
                : userImage
            }
          ></img>
                                </div>
                                <div className="allusers-name">
                                    <p className="allusers-firstname">{user.username}</p>
                                    {/* <p>{user.last_name}</p> */}
                                </div>
                                <div>
                                    <p className="allusers-location">Software Engineer</p>
                                </div>
                                <div className="allusers-connect-btn-ctn">
                                <NavLink exact to={`/users/${user.id}/profile`} className='allusers-links'>
                                    <button className="allusers-connect-btn">Connect</button>
                        </NavLink>
                                </div>
                                </div>

                            </div>

                    )

                })}
            </div>
        </div>

        </>
    }


}

export default AllUsers