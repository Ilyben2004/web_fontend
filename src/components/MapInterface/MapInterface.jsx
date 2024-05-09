import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../header/Header';
import MyMap from '../mapContainer/MyMap';
import './mapInterface.css'
import Sidebar from './Sidebar';









function MapInterface() {
    const [phones, setphones] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            console.log("Fetching data");
            axios.get('http://127.0.0.1:8000/api/locations')
                .then((response) => {
                    console.log('Data received:', response.data.data);
                    setphones(response.data.data);
                    console.log(phones +"hhhhhhhhhhhhh")
                })
                .catch((error) => {
                    console.error('Error fetching phone locations:', error);
                });
        };
    
        fetchData();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);
    

    return (
       
            
      
        <div className="app-containerCC">
            <Header />
            <MyMap phones={phones} />
            </div>
          
           
        
          
    
    );
}

export default MapInterface;
