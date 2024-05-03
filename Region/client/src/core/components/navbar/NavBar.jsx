import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../assets/logo.png'

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className="" style={{width:"100% !important", margin:"0", backgroundColor:"#C4DFDF"}}>
                <Container style={{backgroundColor:"#C4DFDF", width:"100vw", margin:"0"}}>
                    <Navbar.Brand href="#home">
                        <img src={logo} alt="" width={100} height={100} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar