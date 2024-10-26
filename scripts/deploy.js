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
const { ethers } = require("hardhat");

async function main() {
	const AuditTrail = await ethers.getContractFactory("AuditTrail");
	const auditTrail = await AuditTrail.deploy();
	await auditTrail.waitForDeployment();

	console.log("AuditTrail contract deployed to:", auditTrail.target);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
