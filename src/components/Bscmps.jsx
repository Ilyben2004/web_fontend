import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Bscmps.css';

// First Component
export function ButtonCustom({ buttonContent }) {
    return (
        <Button className='ButtonCustom' variant="dark">{buttonContent}</Button>
    );
}
