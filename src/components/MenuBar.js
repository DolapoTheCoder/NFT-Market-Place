import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './MenuBar.css';
import MetaMaskConnection from './MetaMaskConnection';

const MenuBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">
                DeCentralHub Market Place
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <MetaMaskConnection/>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default MenuBar;