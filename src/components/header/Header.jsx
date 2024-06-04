import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { IoMdLogOut } from "react-icons/io";

function Header({ isLoggedIn }) {
    // Function to handle logout
    const handleLogout = () => {
    };

    return (
        <div id="header">
            <div className='LogoCC'>TrackMobile</div>
            {isLoggedIn && (
                <nav id="navigator">
                    <NavLink to="/addphone" className={({ isActive }) => isActive ? 'currentRoot' : ''}>Add Phone</NavLink>
                    <NavLink to="/map" className={({ isActive }) => isActive ? 'currentRoot' : ''}>Map</NavLink>
                    <NavLink to="/notification" className={({ isActive }) => isActive ? 'currentRoot' : ''}>Notification</NavLink>
                </nav>
            )}
            {/* Conditional rendering of logout button */}
            {isLoggedIn && (
                <div id="logoutContainer">
                       <NavLink to="/" >
                       <IoMdLogOut id="logoutIcon" onClick={handleLogout} />

                       </NavLink>
                </div>
            )}
        </div>
    );
}

export default Header;
