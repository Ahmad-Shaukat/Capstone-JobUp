import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ImParagraphLeft } from 'react-icons/im'
import { FaUserFriends } from 'react-icons/fa'
import BigSidebar from '../BigSideBar';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const [isNavVisible, setIsNavVisible] = useState(false);
	const navRef = useRef()
	// const showNavbar = () => {
	// 	navRef.current.classList.toggle('responsive_nav')
	// }
	const showNavbar = () => {
		setIsNavVisible(!isNavVisible);
	  };



	return (
		<>
		{isLoaded &&  (
			<nav>
			{sessionUser && (
				<div className='nav-opt'>
					<ImParagraphLeft size={18}  onClick={showNavbar}/>
					<div className={`res-nav-bar ${isNavVisible ? 'responsive-nav' : ''}`} ref={navRef}>
						<p>options</p>
						<button className='res-nav-btn res-nav-close-btn' onClick={showNavbar}>close</button>
					</div>
				</div>
			)}



			{isLoaded && (
				<div className='nav-user-connect'>
					
						<div className='connect-btn-conta'>
							<NavLink path to='/allusers' className='connect-navlink'><button className='connect-btn'><span><FaUserFriends /></span>Connect</button></NavLink>
						</div>
					

					<div className='nav-user'>

						<ProfileButton user={sessionUser} />
					</div>

				</div>
			)}

		</nav>
		)}
			{/* <nav>
				{sessionUser && (
					<div className='nav-opt'>
						<ImParagraphLeft size={18} color='#4361ee' />
					</div>
				)}



				{isLoaded && (
					<div className='nav-user-connect'>
						{sessionUser && (
							<div className='connect-btn-conta'>
								<NavLink path to='/allusers' className='connect-navlink'><button className='connect-btn'><span><FaUserFriends /></span>Connect</button></NavLink>
							</div>
						)}

						<div className='nav-user'>

							<ProfileButton user={sessionUser} />
						</div>

					</div>
				)}

			</nav> */}
		</>


	);
}

export default Navigation;