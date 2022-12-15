import React from 'react';
import {Button} from 'react-bootstrap';
import { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import {ethers} from 'ethers';


const MetaMaskConnection = () => {
  
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
      });
      setUser(accounts);
      
    } else {
      window.alert("Please download MetaMask wallet.")
    }
  }

  return (
    <>
      { 
        user
        ?
        (
          <>
            <Navbar.Brand href="#home">
              {user}
            </Navbar.Brand>
            <Navbar.Brand>
              Balance:
            </Navbar.Brand>
          </>
        )
        :
        (<Button onClick={connectWallet} variant='secondary'>Connect Wallet</Button>)
      }
    </>
  )
}

export default MetaMaskConnection;