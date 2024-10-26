//Uncomment when using testnet
// const { ethers, utils } = require("hardhat");

// async function main() {
// 	const [deployer] = await ethers.getSigners();
// 	console.log("Deployer object:", deployer);

// 	// Use provider to get balance and ensure `utils` is used correctly
// 	const balance = await ethers.provider.getBalance(deployer.address);
// 	console.log("Account balance:", ethers.formatEther(balance), "ETH");

// 	const AuditTrail = await ethers.getContractFactory("AuditTrail");
// 	const auditTrail = await AuditTrail.deploy();
// 	await auditTrail.waitForDeployment();

// 	console.log("AuditTrail contract deployed to:", auditTrail.target);
// }

// main()
// 	.then(() => process.exit(0))
// 	.catch((error) => {
// 		console.error(error);
// 		process.exit(1);
// 	});

// scripts/deploy.js
// const { ethers } = require("hardhat");

// async function main() {
// 	const AuditTrail = await ethers.getContractFactory("AuditTrail");
// 	const auditTrail = await AuditTrail.deploy();
// 	await auditTrail.waitForDeployment();

// 	console.log("AuditTrail contract deployed to:", auditTrail.target);
// }

// main().catch((error) => {
// 	console.error(error);
// 	process.exit(1);
// });


// async function main() {
//     // Define the approver addresses (replace with actual addresses)
//     const approvers = [
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266.",
//         "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//         "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
//     ];

//     // Get the contract factory
//     const AuditTrail = await ethers.getContractFactory("AuditTrail");

//     // Deploy the contract with the approvers array
//     const auditTrail = await AuditTrail.deploy(approvers);
//     await auditTrail.deployed();

//     console.log("AuditTrail deployed to:", auditTrail.address);
// }

// // Execute the deployment script
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

// 	const { ethers } = require("hardhat");

// async function main() {
//     const approvers = [
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266.",
//         "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//         "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
//     ];

//     const AuditTrail = await ethers.getContractFactory("AuditTrail");
//     const auditTrail = await AuditTrail.deploy(approvers);
//     await auditTrail.deployed();

//     console.log("AuditTrail deployed to:", auditTrail.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

	

// Import necessary modules
// const { ethers } = require("hardhat");

// async function main() {
//     // Replace these with actual Ethereum addresses
//     const approvers = [
// 		"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266.",
// 		"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
// 		"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
//     ];

//     // Get the contract factory
//     const AuditTrail = await ethers.getContractFactory("AuditTrail");

//     // Deploy the contract
//     const auditTrail = await AuditTrail.deploy();
//     await auditTrail.deployed();

//     // Output the deployed contract address
//     console.log("AuditTrail deployed to:", auditTrail.address);
// }

// // Execute the main function and handle errors
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

// Import necessary modules
// const { ethers } = require("hardhat");

// async function main() {
//     // Replace these with actual Ethereum addresses (without trailing periods)
//     const approvers = [
//         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Replace with a valid address
//         "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Replace with a valid address
//         "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"  // Replace with a valid address
//     ];

//     // Get the contract factory
//     const AuditTrail = await ethers.getContractFactory("AuditTrail");

//     // Deploy the contract with the approvers array as a single parameter
//     const auditTrail = await AuditTrail.deploy(approvers);
//     await auditTrail.deployed();

//     // Output the deployed contract address
//     console.log("AuditTrail deployed to:", auditTrail.address);
// }

// // Execute the main function and handle errors
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

// Import necessary modules
const { ethers } = require("hardhat");

async function main() {
    // Replace these with actual Ethereum addresses (no trailing periods)
    const approvers = [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Replace with a valid address
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Replace with a valid address
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"  // Replace with a valid address
    ];

    // Get the contract factory
    const AuditTrail = await ethers.getContractFactory("AuditTrail");

    // Deploy the contract and pass the approvers array
    const auditTrail = await AuditTrail.deploy(approvers);

    // Wait for the contract to be deployed
	await auditTrail.waitForDeployment();

    // Output the deployed contract address
    console.log("AuditTrail deployed to:", auditTrail.target);
}

// Execute the main function and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

