import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import OpenSideBarSvg from './OpenSideBarSvg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';
import PhoneSvg from './PhoneSvg';
import { format, differenceInMinutes } from 'date-fns';

export default function BasicDemo({ phones, onDefaultCenterChange }) {
    const [visible, setVisible] = useState(false);

    const handleButtonClick = (latitude, longitude) => {
        const newCenter = [latitude, longitude];
        onDefaultCenterChange(newCenter);
    };

    return (
        <div className="card flex justify-content-center">
            <Sidebar id='mySideBar' visible={visible} onHide={() => setVisible(false)}>
                {phones.map((phone, index) => {
                    // Parse the date string from phone.phone.updated_at
                    const updatedAt = new Date(phone.updated_at);
                    const now = new Date();
                    console.log(phone);
                    
                    // Calculate the difference in minutes
                    const minutesDifference = differenceInMinutes(now, updatedAt);
                    
                    // Format the date and time if the difference is more than 20 minutes
                    const formattedDateTime = format(updatedAt, 'MM/dd/yyyy HH:mm:ss');
                    
                    return (
                        <div
                            className='phoneContainer'
                            key={index}
                            onClick={() => handleButtonClick(phone.latitude, phone.longitude)}
                        >
                            <div className="svgContainer">
                                <PhoneSvg />
                            </div>
                            <div className="informationsContainer">
                                <div className="OwnerName">{phone.phone.ownerName}</div>
                                <div className="lastOnline">
                                    {minutesDifference <= 20 ? 'Online' : formattedDateTime}
                                </div>
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
