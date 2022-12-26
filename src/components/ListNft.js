import React, {useState} from 'react';
import { uploadJSONToIPFS, uploadFileToIPFS } from './Pinata';
import NFTMarketplace from '../NFTMarketplace.json';
//import {useLocation} from 'react-router';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const ListNft = () => {
  const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  //const location = useLocation();

  const state = useSelector((state) => state);
  console.log("ListNFT State: ", state.user)

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
        //check for file extension
    try {
            //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if(response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL)
        setFileURL(response.pinataURL);
      }
    }
    catch(e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const {name, description, price} = formParams;
    //Make sure that none of the fields are empty
    if( !name || !description || !price || !fileURL)
        return;

    const nftJSON = {
        name, description, price, image: fileURL
    }

    try {
        //upload the metadata JSON to IPFS
        const response = await uploadJSONToIPFS(nftJSON);
        if(response.success === true){
            console.log("Uploaded JSON to Pinata: ", response)
            return response.pinataURL;
        }
    }
    catch(e) {
        console.log("error uploading JSON metadata:", e)
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
        const metadataURL = await uploadMetadataToIPFS();
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        updateMessage("Please wait.. uploading (upto 5 mins)")

        //Pull the deployed contract instance
        let contract = new ethers.Contract(NFTMarketplace.address, NFTMarketplace.abi, signer)

        //massage the params to be sent to the create NFT request
        const price = ethers.utils.parseUnits(formParams.price, 'ether')
        let listingPrice = await contract.getListPrice()
        listingPrice = listingPrice.toString()

        //actually create the NFT
        let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
        await transaction.wait()

        alert("Successfully listed your NFT!");
        updateMessage("");
        updateFormParams({ name: '', description: '', price: ''});
        //window.location.replace("/")
    }
    catch(e) {
        alert( "Upload error"+e )
    }
  }


  return (
    <>
      <div>LIST A NFT</div>
      <div>
      <h3>Upload your NFT to the Marketplace.</h3>
        <Form style={{width: '500px'}}>
          <div>
          <Form.Group style={{border: '5px solid grey', padding: 5}}>
            <Form.Label column sm={2} style={{display: 'inline-block', width: '150px'}}>NFT Name: </Form.Label>
            <Form.Control style={{width: '300px', display: 'inline-block'}} id='name' type='text' placeholder='BAYC #7717' onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}/>
            <Form.Label column sm={2} style={{display: 'inline-block', width: '150px'}}>NFT Description: </Form.Label>
            <Form.Control style={{width: '300px', display: 'inline-block'}} id='description' type='text' placeholder='Bored Ape Yacht Club' onChange={e => updateFormParams({...formParams, description: e.target.value})} value={formParams.description}/>
            <Form.Label column sm={2} style={{display: 'inline-block', width: '150px'}}>Price (in ETH): </Form.Label>
            <Form.Control style={{width: '300px', display: 'inline-block'}} id='description' type='number' step={0.01} placeholder='Min 0.01' onChange={e => updateFormParams({...formParams, price: e.target.value})} value={formParams.price}/>
            <Form.Label column sm={2} style={{display: 'inline-block', width: '150px'}}>Upload Image: </Form.Label>
            <Form.Control style={{width: '300px', display: 'inline-block'}} id='description' type='file' onChange={OnChangeFile}/>
            <br></br>
            <br></br>
            <Button onClick={listNFT} variant='secondary'>List NFT</Button>
          </Form.Group>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ListNft;