import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './listphone.css';

// Initialize the ListPhone component
function ListPhone() {
    const [phones, setPhones] = useState([]);
    const [selectedPhone, setSelectedPhone] = useState(null); // To manage the selected phone for editing
    const [formData, setFormData] = useState({
        ownerName: '',
        libelle: '',
        type: '',
        city: '',
        phoneNumber: '',
        email: ''
    });

    // Fetch data from the API endpoint when the component mounts
    useEffect(() => {
        async function fetchPhones() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/phones');
                const data = await response.json();
                if (data.status) {
                    setPhones(data.data);
                } else {
                    console.error('Failed to fetch data:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchPhones();
    }, []);

    // Function to handle deleting a phone entry
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
                // Update the state to remove the deleted phone from the list
                setPhones(phones.filter((phone) => phone.id !== id));
            } else {
                console.error('Failed to delete phone:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting phone:', error);
        }
    }

    // Function to handle selecting a phone for editing
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

    // Function to handle updating a phone entry
    async function handleUpdate(event) {
        event.preventDefault();
        if (selectedPhone) {
            console.log(formData);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/phones/${selectedPhone.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.status) {
                    // The update was successful
                    const updatedPhoneData = await response.json();
                    // Update the phone entry in the state
                    setPhones(phones.map((phone) => phone.id === selectedPhone.id ? updatedPhoneData.data : phone));
    
                    // Clear selectedPhone and formData
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
                    // Handle non-successful responses
                    const errorText = await response.text();
                    console.error(`Failed to update phone: ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error('Error updating phone:', error.message);
            }
        }
    }
    

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Owner Name</th>
                        <th>Phone Model</th>
                        <th>Type</th>
                        <th>City</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map((phone, index) => (
                        <tr key={phone.id}>
                            <td>{index + 1}</td>
                            <td>{phone.ownerName}</td>
                            <td>{phone.libelle}</td>
                            <td>{phone.type}</td>
                            <td>{phone.city}</td>
                            <td>{phone.phoneNumber}</td>
                            <td>{phone.email}</td>
                            <td>
                                {/* Add click handler for edit */}
                                <FaRegEdit
                                    className='icons edit'
                                    onClick={() => handleEdit(phone)}
                                />
                                <MdDelete
                                    className='icons delete'
                                    onClick={() => handleDelete(phone.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Form for editing phone entries */}
            {selectedPhone && (
                <form className='updateForm' onSubmit={handleUpdate}>
                    <h3>Edit Phone</h3>
                    <div>
                        <label>Owner Name</label>
                        <input
                            type="text"
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Phone Model</label>
                        <input
                            type="text"
                            value={formData.libelle}
                            onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Type</label>
                        <input
                            type="text"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setSelectedPhone(null)}>Cancel</button>
                </form>
            )}
        </>
    );
}

export default ListPhone;
