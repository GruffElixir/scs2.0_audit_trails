const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const AuditTrail = await hre.ethers.getContractFactory("AuditTrail");
    const auditTrail = await AuditTrail.attach("YOUR_DEPLOYED_CONTRACT_ADDRESS");

    // Set transaction parameters
    const sender = "sam";
    const receiver = "abhi";
    const amount = 99900;
    const purpose = "test2";

    try {
        // Attempt to add block, expecting possible confirmation error
        await auditTrail.addBlock(sender, receiver, amount, purpose);
        console.log("Block added successfully.");
    } catch (error) {
        console.log("Confirmation required:", error.message);

        // Confirm the transaction for amounts above 25,000
        await auditTrail.confirmTransaction();
        console.log("Transaction confirmed, retrying...");

        // Retry adding the block
        await auditTrail.addBlock(sender, receiver, amount, purpose);
        console.log("Block added successfully after confirmation.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
