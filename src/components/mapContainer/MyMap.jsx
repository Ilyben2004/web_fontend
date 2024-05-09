import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Header from '../header/Header';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Configure Leaflet's default icon to avoid issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MyMap({ phones, defaultCenter }) {
    // Create a ref for the MapContainer
    const mapRef = useRef(null);

    // Adjust the map center when defaultCenter changes
    useEffect(() => {
        if (mapRef.current) {
            const mapInstance = mapRef.current;
            // Set the new center of the map
            mapInstance.setView(defaultCenter, mapInstance.getZoom());
        }
    }, [defaultCenter]); // Run this effect whenever defaultCenter changes

    return (
        <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: '100%', width: '100%', position: 'fixed' }}
            ref={mapRef} // Pass the ref to MapContainer
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {phones.map((phone, index) => (
                <Marker key={index} position={[phone.latitude, phone.longitude]}>
                    <Popup>
                        <div>
                            <p>Owner: {phone.phone.ownerName}</p>
                            <p>Phone Model: {phone.phone.libelle}</p>
                            <p>Type: {phone.phone.type}</p>
                            <p>City: {phone.phone.city}</p>
                            <p>Phone Number: {phone.phone.phoneNumber}</p>
                            <p>Email: {phone.phone.email}</p>
                            <button>choose a location</button>

                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MyMap;
