import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import MyMap from '../mapContainer/MyMap';
import './mapInterface.css';
import Sidebar from './Sidebar';
import TargetLocations from './TargetLocations';
import Loading from '../lodaing/Loading';

function MapInterface({isLoggedIn}) {
    const [defaultCenter, setDefaultCenter] = useState([0, 0]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [phones, setPhones] = useState([]);
    const [targetLocations, setTargetLocations] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
        const fetchDataTargetLocations = () => {
            axios.get('http://127.0.0.1:8000/api/target-locations')
                .then((response) => {
                    setTargetLocations(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching phone Target locations:', error);
                });
        };
        fetchDataTargetLocations();
        fetchData();
        
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleDefaultCenterChange = (newCenter) => {
        setDefaultCenter(newCenter);
    };

    const handleSelectedLocations = (newCenter) => {
        setSelectedLocation(newCenter);
    };

    const filterTargetLocations = (id) => {
        setTargetLocations(targetLocations.filter((phone) => phone.id !== id));
    };

    const addTargetLocation = (newTargetLocation) => {
        setTargetLocations((prevTargetLocations) => [...prevTargetLocations, newTargetLocation]);
    };

    if (showLoading) {
        return <Loading />;
    }

    return (
        <div className="app-containerCC">
            <Header isLoggedIn={isLoggedIn} />
            <div className='HomeContainercc'>
                <div id="sideBarContainer">
                    <Sidebar phones={phones} defaultCenter={defaultCenter} onDefaultCenterChange={handleDefaultCenterChange} />
                </div>
                <div id="mapContainer">
                    <MyMap phones={phones} defaultCenter={defaultCenter} selectedLocation={selectedLocation} OnSelectedLocationChange={handleSelectedLocations} addTargetLocation={addTargetLocation} />
                </div>
                <div id="sideBarContainer">
                    <TargetLocations phones={targetLocations} selectedLocation={selectedLocation} defaultCenter={defaultCenter} onDefaultCenterChange={handleDefaultCenterChange} OnSelectedLocationChange={handleSelectedLocations} filterTargetLocations={filterTargetLocations} />
                </div>
            </div>
        </div>
    );
}

export default MapInterface;
