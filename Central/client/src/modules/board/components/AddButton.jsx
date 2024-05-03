import React from 'react'
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap'
import { IoPersonAddSharp } from "react-icons/io5";
import './AddButton.css'
import { useNavigate } from 'react-router-dom';

const AddButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add-appointment')
    }
    
    return (
        <Row style={{ justifyContent: "end" }}>
            <Button className="AddButton" onClick={handleClick}> <IoPersonAddSharp size={40} /> </Button>
        </Row>
    )
}

export default AddButton