import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
 
    const balance = await deployer.provider?.getBalance(deployer.address);
    console.log("Account balance:", balance?.toString());
 
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
 
    await token.waitForDeployment();
    console.log("Token deployed to:", await token.getAddress());
}
 
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });