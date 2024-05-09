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

function MyMap({ phones }) {
    
    // Empty dependency array since the effect does not rely on props or state

    


    // Determine a default center position
    const defaultCenter = phones.length > 0 ? [phones[0].latitude, phones[0].longitude] : [0, 0];
    
    return (
            
          
            <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' ,position:'fixed'}}>
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
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
    );
}

export default MyMap;
