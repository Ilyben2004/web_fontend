import React from 'react';
import Table from 'react-bootstrap/Table';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './listphone.css';
import PhoneSvg from './PhoneSvg';

function ListPhone({ phones, selectedPhone, formData, onEdit, onDelete, onUpdate, setSelectedPhone, setFormData  }) {
    return (
        <div id="tableContainerInsinde">
            <Table id='PhonesTableList' responsive>
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
                                <FaRegEdit
                                    className='icons edit'
                                    onClick={() => onEdit(phone)}
                                />
                                <MdDelete
                                    className='icons delete'
                                    onClick={() => onDelete(phone.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedPhone && (
                <div className="formContainer">
                    <form className='updateForm' onSubmit={onUpdate}>
                        <div className="header">
                            <PhoneSvg />
                        </div>
                        <hr />
                        <div className="tableContainer">
                        <table>
    <tbody>
        <tr>
            <td><label>Owner Name :</label></td>
            <td>
                <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                />
            </td>
        </tr>
        <tr>
            <td><label>Phone Model :</label></td>
            <td>
                <input
                    type="text"
                    value={formData.libelle}
                    onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                />
            </td>
        </tr>
        <tr>
            <td><label>Type :</label></td>
            <td>
                <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />
            </td>
        </tr>
        <tr>
            <td><label>City :</label></td>
            <td>
                <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
            </td>
        </tr>
        <tr>
            <td><label>Phone Number :</label></td>
            <td>
                <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
            </td>
        </tr>
        <tr>
            <td><label>Email :</label></td>
            <td>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </td>
        </tr>
    </tbody>
</table>
                        </div>
                        <div className="button-container">
                            <button id="ubdateButton" type="submit">Update</button>
                            <button id="cancelButton" type="button" onClick={() => setSelectedPhone(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ListPhone;
