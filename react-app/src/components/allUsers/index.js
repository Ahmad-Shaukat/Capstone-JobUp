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
            <div className="allusers-main-cont">

                {filtered_users.map((user) => {
                    return (
                        <NavLink exact to={`/users/${user.id}/profile`} className='allusers-links'>

                            <div key={user.id} className="allusers-single-cont" >
                                <div className="allusers-inner-content">

                                <div className="allusers-img-cont">
                                    <img src='https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg'/>
                                </div>
                                <div className="allusers-name">
                                    <p className="allusers-firstname">{user.first_name}</p>
                                    <p>{user.last_name}</p>
                                </div>
                                <div>
                                    <p className="allusers-location">{user.career}</p>
                                </div>
                                <div className="allusers-connect-btn-ctn">
                                    <button className="allusers-connect-btn">Connect</button>
                                </div>
                                </div>

                            </div>
                        </NavLink>

                    )

                })}
            </div>

        </>
    }


}

export default AllUsers