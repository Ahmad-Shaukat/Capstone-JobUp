import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
			{sessionUser && (
				<div>
					<NavLink exact to = '/interviews'>My Interviews</NavLink>
					<NavLink exact to = '/user'> User Profile </NavLink>
					<NavLink exact to = '/newInterview'>Add Interview</NavLink>
					<NavLink exact to = '/allUsers'>All Users</NavLink>
					<NavLink exact to ='/findjobs'>Find Jobs</NavLink>
					<NavLink exact to ='/favlists'>
					My Favorites
					</NavLink>
					
				</div>
			)}
			
		</nav>

	);
}

export default Navigation;