import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div id="header">
            <div className='LogoCC'>TrackMobile</div>
            <nav id="navigator">
                <NavLink to="/addphone" className={({ isActive }) => isActive ? 'currentRoot' : ''}>Add Phone</NavLink>
                <NavLink to="/map" className={({ isActive }) => isActive ? 'currentRoot' : ''}>Map</NavLink>
                <NavLink to="/notification" className={({ isActive }) => isActive ? 'currentRoot' : ''}>Notification</NavLink>
            </nav>
        </div>
    );
}

export default Header;
