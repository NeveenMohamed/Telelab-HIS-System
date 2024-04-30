import React from 'react'
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap'
import { IoPersonAddSharp } from "react-icons/io5";
import './AddButton.css'

const AddButton = () => {
    return (
        <Row style={{justifyContent: "end"}}>
            <Button className="AddButton"> <IoPersonAddSharp size={40}/> </Button>
        </Row>
    )
}

export default AddButton