import React from 'react';
import './PhoneDeletePopup.css'; // Import CSS for styling

const PhoneDeletePopup = ({ onDelete, onCancel }) => {
    return (
        <div className="phone-delete-popup">
            <div className="popup-content">
                <h3>Are you sure you want to delete this phone?</h3>
                <div className="button-container">
                    <button className="delete-button" onClick={onDelete}>Yes</button>
                    <button className="cancel-button" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default PhoneDeletePopup;
