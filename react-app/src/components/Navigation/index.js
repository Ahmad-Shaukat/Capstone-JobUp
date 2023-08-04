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
					<NavLink exact to = '/interviews'>All Jobs</NavLink>
					<NavLink exact to = '/user'> User Profile </NavLink>
					<NavLink exact to = '/newInterview'>Add Interview</NavLink>
					
				</div>
			)}
			
		</nav>

	);
}

export default Navigation;