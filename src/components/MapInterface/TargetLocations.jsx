import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import OpenSideBarSvg from './OpenSideBarSvg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';
import { format } from 'date-fns';
import SvgRedLocation from '../mapContainer/SvgRedLocation'

export default function TargetLocations({ phones,  onDefaultCenterChange }) {
    const [visible, setVisible] = useState(false);

    // Handler function to update the default center when a phone entry is clicked
    const handleButtonClick = (latitude, longitude) => {
        const newCenter = [latitude, longitude];
        onDefaultCenterChange(newCenter);
    };

    return (
        <div className="card flex justify-content-center">
            {/* Set the position prop to 'right' to display the sidebar on the right side */}
            <Sidebar id='mySideBar' visible={visible} onHide={() => setVisible(false)} position="right">
                {phones.map((phone, index) => {
                    // Parse the date string from phone.phone.updated_at
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
                            <div className="informationsContainer">
                                <div className="OwnerName">{phone.phone.ownerName}</div>
                                <div className="lastOnline">{formattedDateTime}</div>
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
