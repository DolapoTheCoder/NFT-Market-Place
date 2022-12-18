import React, {useState} from 'react';
import { uploadJSONToIPFS, uploadFileToIPFS } from './Pinata';
import NFTMarketplace from '../NFTMarketplace.json';
//import {useLocation} from 'react-router';
import {Form, Button, Row, Col} from 'react-bootstrap';

const ListNft = () => {
  const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState('');
  //const location = useLocation();

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

  const backHome = () => {
    //send page back to the top.
  } 

  return (
    <>
      <div>LIST A NFT</div>
      <div>
      <h3>Upload your NFT to the Marketplace.</h3>
        <Form style={{width: '300px'}}>
          <Form.Group style={{border: '5px solid grey', padding: 5}} as={Row} controlId="name">
            <Form.Label column sm={2}>NFT Name: </Form.Label>
            <Col>
              <Form.Control style={{fontSize: 12, padding: 3}} id='name' type='text' placeholder='BAYC #7717' onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}/>
            </Col>
          </Form.Group>
        </Form>  
      </div>
      <Button onClick={backHome} variant='secondary'>Back to the top</Button>
    </>
  )
}

export default ListNft;