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
      const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
      setUser(accounts[0]);
      let balance = await window.ethereum.request({method: 'eth_getBalance', params: [accounts[0], 'latest']})
      balance = Math.round(ethers.utils.formatEther(balance) * 1e4) / 1e4;      
      setBalance(balance);      
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
              Balance: {balance} ETH
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