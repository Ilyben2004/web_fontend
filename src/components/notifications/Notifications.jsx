import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import './nitification.css';
import NotificationsList from './NotificationsList';
import Loading from '../lodaing/Loading';

function Notifications({isLoggedIn}) {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        // Hide the loading component after 2 seconds
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 2500);

        // Clear the timer if the component is unmounted before the timer completes
        return () => clearTimeout(timer);
    }, []);

    if (showLoading) {
        return <Loading />;
    }

    return (
        <div className="app-containerCC">
            <Header isLoggedIn={isLoggedIn} />
            <div className='HomeContainercc'>
                <div id="notificationContainer">
                    <NotificationsList />
                </div>
            </div>
        </div>
    );
}

export default Notifications;
