import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import AddPhoneForme from './AddPhoneForme';
import ListPhone from '../phoneList/ListPhone';
import './AddPhone.css';

function AddPhone() {
    const [phones, setPhones] = useState([]);
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [formData, setFormData] = useState({
        ownerName: '',
        libelle: '',
        type: '',
        city: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        fetchPhones();
    }, []);

    async function fetchPhones() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/phones');
            const data = await response.json();
            if (data.status) {
                setPhones(data.data);
                console.log(data.data)
            } else {
                console.error('Failed to fetch data:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleDelete(id) {
        console.log(id);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/phones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status) {
                setPhones(phones.filter((phone) => phone.id !== id));
            } else {
                console.error('Failed to delete phone:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting phone:', error);
        }
    }

    function handleEdit(phone) {
        setSelectedPhone(phone);
        setFormData({
            ownerName: phone.ownerName,
            libelle: phone.libelle,
            type: phone.type,
            city: phone.city,
            phoneNumber: phone.phoneNumber,
            email: phone.email
        });
    }

    async function handleUpdate(event) {
        event.preventDefault();
        if (selectedPhone) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/phones/${selectedPhone.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.status) {
                    const updatedPhoneData = await response.json();
                    setPhones(phones.map((phone) => phone.id === selectedPhone.id ? updatedPhoneData.data : phone));
                    setSelectedPhone(null);
                    setFormData({
                        ownerName: '',
                        libelle: '',
                        type: '',
                        city: '',
                        phoneNumber: '',
                        email: ''
                    });
                } else {
                    const errorText = await response.text();
                    console.error(`Failed to update phone: ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error('Error updating phone:', error.message);
            }
        }
    }
    const addNewPhone = (phone) => {
        setPhones([phone, ...phones]);
    };

    return (
        <div className="app-containerCC">
            <Header />
            <div className="containerCC">
                <div className="descreptionCC imSignContainer">
                    <div className="textSign">Your  Please Enter Your Appreils Information</div>
                    <AddPhoneForme 
                    fetchPhones={fetchPhones}
                     />
                </div>
                <div id="tableContainer" className="imageCC">
                <ListPhone
    phones={phones}
    selectedPhone={selectedPhone}
    formData={formData}
    onEdit={handleEdit}
    onDelete={handleDelete}
    onUpdate={handleUpdate}
    setSelectedPhone={setSelectedPhone} 
    setFormData={setFormData}
/>

                </div>
            </div>
        </div>
    );
}

export default AddPhone;
