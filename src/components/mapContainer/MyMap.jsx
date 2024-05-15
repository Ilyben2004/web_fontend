import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import SvgRedLocation from './SvgRedLocation';
import ReactDOMServer from 'react-dom/server';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MyMap({ phones, defaultCenter,OnSelectedLocationChange ,selectedLocation, addTargetLocation}) {
    
    const customRedIcon = L.divIcon({
        html: ReactDOMServer.renderToStaticMarkup(<SvgRedLocation />),
        className: 'custom-red-icon',
        iconSize: [25, 41], // Size of the div containing the SVG icon
        iconAnchor: [12, 41], // Anchor point of the icon (where it will point on the map)
    });
   
    
    // State and refs
    const mapRef = useRef(null);

    // Event handler for map clicks
    function handleMapClick(event) {
        const { lat, lng } = event.latlng;
        const newLocation = [lat, lng];

        OnSelectedLocationChange(newLocation);
    }

    async function handleSendLocation(phoneId, lat, lng) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/target-locations`, {
                phone_id: phoneId,
                latitude: lat,
                longitude: lng,
            });

            // Log success
            console.log('Location sent to the database:', response.data);
            addTargetLocation(response.data.data);

            OnSelectedLocationChange(null);
        } catch (error) {
            console.error('Error sending location:', error);
        }
    }

    // Event handler for map events
    function MapEvents() {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    // Update map center when `defaultCenter` changes
    useEffect(() => {
        if (mapRef.current) {
            // Use `mapRef.current` to access the map instance
            const mapInstance = mapRef.current;
            mapInstance.setView(defaultCenter, mapInstance.getZoom());
        }
    }, [defaultCenter]);

    return (
        
        <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' , position:'fixed' }}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents />
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
                            <button className='sendLocationButton' onClick={() => handleSendLocation(phone.phone.id, selectedLocation ? selectedLocation[0] : phone.latitude, selectedLocation ? selectedLocation[1] : phone.longitude)}>
                                Send a location
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
            {/* Marker for selected location */}
            {selectedLocation && (
                 <Marker position={selectedLocation} icon={customRedIcon}>
                 <Popup>
                     <p>Selected location</p>
                 </Popup>
             </Marker>
            )}
        </MapContainer>
    );
}

export default MyMap;
