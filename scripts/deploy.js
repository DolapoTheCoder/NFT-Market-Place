const { ethers } = require("hardhat");

async function main() {
    const NFTMarketPlace = await ethers.getContractFactory("NFTMarketplace");

    const nft_market_place = await NFTMarketPlace.deploy();
    console.log("Contract deployed to address:", nft_market_place.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });