import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsersThunk } from "../../store/user";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const AllUsers = () => {
    let users = useSelector((store) => store.user)
    users = Object.values(users)
    console.log(users, '---------------users')


    return <>
        {users.map((user) => {
            return (
                <NavLink exact to={`/users/${user.id}/profile`}>

                    <div key={user.id}>
                        <p>{user.email}</p>
                        <p>{user.username}</p>
                    </div>
                </NavLink>

            )

        })}

    </>
}

export default AllUsers