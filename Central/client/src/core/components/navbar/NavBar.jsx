import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../assets/logo.png'

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" style={{width:"100%"}}>
                <Container style={{backgroundColor:"#C4DFDF", width:"100vw"}}>
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