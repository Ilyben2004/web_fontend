import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import MyMap from '../mapContainer/MyMap';
import './mapInterface.css';
import Sidebar from './Sidebar';

function MapInterface() {
    // State for default center
    const [defaultCenter, setDefaultCenter] = useState([0, 0]);

    const [phones, setPhones] = useState([]);
    
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:8000/api/locations')
                .then((response) => {
                    setPhones(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching phone locations:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    
    // Define a handler to update the default center
    const handleDefaultCenterChange = (newCenter) => {
        setDefaultCenter(newCenter);
    };

    return (
        <div className="app-containerCC">
            <Header />
            <div className='HomeContainercc'>
                <div id="sideBarContainer">
                    <Sidebar phones={phones} defaultCenter={defaultCenter} onDefaultCenterChange={handleDefaultCenterChange} />
                </div>
                <div id="mapContainer">
                    <MyMap phones={phones} defaultCenter={defaultCenter} />
                </div>
            </div>
        </div>
    );
}

export default MapInterface;
