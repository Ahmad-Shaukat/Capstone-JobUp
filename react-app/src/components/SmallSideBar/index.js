import React from "react"
import logo from '../../utilities/logo.png'
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './app.css'
import { useSelector } from "react-redux"


const Sidebar = () => {
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) {
		history.push('/')
		return null
	}
    return (
        <div className="sidbar-main">
            <div className="logo-cont">
                <img src={logo} className="logo-img" />

            </div>
            <div className="sidbar-links">
                <div>
                    <NavLink exact to='/interviews'>My Interviews</NavLink>
                </div>

                <div>
                    <NavLink exact to='/user'> User Profile </NavLink>
                </div>
                <div>
                    <NavLink exact to='/newInterview'>Add Interview</NavLink>
                </div>
                <div>
                    <NavLink exact to='/allUsers'>All Users</NavLink>
                </div>
                <div>
                    <NavLink exact to='/findjobs'>Find Jobs</NavLink>
                </div>
                <div>
                    <NavLink exact to='/favlists'>
                        My Favorites
                    </NavLink>
                </div>
            </div>
            <div>Hello</div>
        </div>

    )
}

export default Sidebar