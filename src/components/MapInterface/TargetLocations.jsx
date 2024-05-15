import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import OpenSideBarSvg from './OpenSideBarSvg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';
import { format } from 'date-fns';
import SvgRedLocation from '../mapContainer/SvgRedLocation';
import DeleteSvg from './DeleteSvg';

export default function TargetLocations({ phones, onDefaultCenterChange, OnSelectedLocationChange, filterTargetLocations }) {
    const [visible, setVisible] = useState(false);

    // Handler function to update the default center when a phone entry is clicked
    const handleButtonClick = (latitude, longitude) => {
        const newCenter = [latitude, longitude];
        onDefaultCenterChange(newCenter);
        OnSelectedLocationChange(newCenter);
    };

    async function handleDelete(id, event) {
        // Stop the event propagation to prevent parent click events from triggering
        event.stopPropagation();
        
        console.log(id);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/target-locations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status) {
                // Update the state to remove the deleted phone from the list
                filterTargetLocations(id);
                OnSelectedLocationChange(null);
            } else {
                console.error('Failed to delete phone:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting phone:', error);
        }
    }

    return (
        <div className="card flex justify-content-center">
            {/* Set the position prop to 'right' to display the sidebar on the right side */}
            <Sidebar id='mySideBar' visible={visible} onHide={() => setVisible(false)} position="right">
                {phones.map((phone, index) => {
                    // Parse the date string from phone.phone.created_at
                    const updatedAt = new Date(phone.phone.created_at);
                    
                    // Format the date and time
                    const formattedDateTime = format(updatedAt, 'MM/dd/yyyy HH:mm:ss');
                    
                    return (
                        <div
                            className='phoneContainer'
                            key={index}
                            onClick={() => handleButtonClick(phone.latitude, phone.longitude)}
                        >
                            <div className="svgContainer">
                                <SvgRedLocation />
                            </div>
                            <div className="informationsContainer"
                            >
                                <div className="OwnerName">{phone.phone.ownerName}</div>
                                <div className="lastOnline">{formattedDateTime}</div>
                            </div>
                            <div className="DeleteSvgContainer"
                              onClick={(event) => handleDelete(phone.id, event)}>
                                <DeleteSvg 
                                  
                                />
                            </div>
                        </div>
                    );
                })}
            </Sidebar>
            
            <div className='SideBarController' onClick={() => setVisible(true)}>
                <OpenSideBarSvg />
            </div>
        </div>
    );
}
