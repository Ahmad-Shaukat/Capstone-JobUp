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
import BigSidebar from '../SmallNav';
// import {useEffect0}
import {useEffect} from 'react'


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const [isNavVisible, setIsNavVisible] = useState(false);
	const navRef = useRef()
	
	const showNavbar = () => {
		// if (isNavVisible) return 
		setIsNavVisible(!isNavVisible);
	  };
	const hideNav = () => {
		setIsNavVisible(false)
	}
	useEffect(() => {
		if (!isNavVisible) return
		const closeNav = (e) => {
			if (!isNavVisible)return
			if (!navRef.current.contains(e.target)) {
				setIsNavVisible(false)
			}
		}
		document.addEventListener('click', closeNav)
		return () => document.removeEventListener('click', closeNav)
	}, [showNavbar])



	return (
		<>
		{isLoaded &&  (
			<nav>
			{sessionUser && (
				<div>

				<div className='nav-opt'>
					<ImParagraphLeft size={18}  onClick={showNavbar}/>
					<div ref={navRef} className={`res-nav-bar ${isNavVisible ? 'responsive-nav' : ''}`} >
						<BigSidebar closeNav = {hideNav}/>
						<button className='res-nav-btn res-nav-close-btn' onClick={showNavbar}>close</button>
					</div>
				</div>
				</div>
			)}



			{isLoaded && (
				<div className='nav-user-connect'>
					
						<div className='connect-btn-conta'>
							<NavLink path to='/allusers' className='connect-navlink'><button className='connect-btn'><span><FaUserFriends className='connect-icon'/></span>Connect</button></NavLink>
						</div>
					

					<div className='nav-user'>

						<ProfileButton user={sessionUser} />
					</div>

				</div>
			)}

		</nav>
		)}
			
		</>


	);
}

export default Navigation;