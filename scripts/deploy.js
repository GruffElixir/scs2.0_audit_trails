const fs = require("fs");
const path = require("path");

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);

	const AuditTrail = await ethers.getContractFactory("AuditTrail");
	const auditTrail = await AuditTrail.deploy();
	await auditTrail.waitForDeployment();

	console.log("AuditTrail contract deployed to:", auditTrail.target);

	// Save contract address to a config file
	const configPath = path.resolve(__dirname, "../frontend/src/config.js");
	const configContent = `export const contractAddress = "${auditTrail.target}";\n`;

	fs.writeFileSync(configPath, configContent, { encoding: "utf8", flag: "w" });
	console.log(
		"Contract address written to config file at frontend/src/config.js"
	);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
