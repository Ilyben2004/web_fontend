import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';


function NotificationsList() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:8000/api/notifications')
                .then((response) => {
                    setNotifications(response.data.data);
                    console.log(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching Notifications:', error);
                });
        };
    
        fetchData(); 
    }, []); 
    
    function getTimeAgo(timestamp) {
        const currentTime = new Date();
        const timePassed = new Date(currentTime) - new Date(timestamp);
        const seconds = Math.floor(timePassed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    }
    
    return (
        <div id="tableContainerInsinde">
            <Table id='PhonesTableList' responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>descreption</th>
                        <th>time</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification, index) => (
                        <tr key={notification.id}>
                            <td>{index + 1}</td>
                            <td>{notification.description}</td>
                            <td>{getTimeAgo(notification.created_at)}</td>
                         
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
          
        </div>
    );
}

export default NotificationsList;
