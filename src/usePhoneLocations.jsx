import { useState, useEffect } from 'react';
import axios from 'axios';

function usePhoneLocations() {
    const [phoneLocations, setPhoneLocations] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/locations')
            .then((response) => {
                setPhoneLocations(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching phone locations:', error);
            });
    }, []);

    // Return phoneLocations state
    return phoneLocations;
}

export default usePhoneLocations;
