import React from 'react';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';


const MenuBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">
                NFT Market Place
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Button variant='secondary'>Connect Wallet</Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default MenuBar;