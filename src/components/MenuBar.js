import React, {useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './MenuBar.css';
import MetaMaskConnection from './MetaMaskConnection';
import {useSelector} from 'react-redux';


const MenuBar = () => {
  //const [user, setUser] = useState('');
  const state = useSelector((state) => (state));
  
  //setUser(state.user);


  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">
                DeCentralHub Market Place
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="shop">Shop NFT's</Nav.Link>
                    {state.user ? (

                    <Nav.Link href='profile'>Profiile</Nav.Link>

                    ) : (

                    <></>

                    )}
                </Nav>
                <MetaMaskConnection/>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default MenuBar;