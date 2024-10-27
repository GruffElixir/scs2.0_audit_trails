import { ethers } from "ethers";
import AuditTrailABI from "./contracts/AuditTrails.sol/AuditTrail.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

// Connect to the contract
const connectContract = async () => {
    try {
        // In ethers v6, getSigner() is an async operation
        const signer = await provider.getSigner();
        
        const auditTrailContract = new ethers.Contract(
            contractAddress,
            AuditTrailABI.abi,
            signer
        );
        
        return auditTrailContract;
    } catch (error) {
        console.error("Error connecting to contract:", error);
        throw error;
    }
};

// Get read-only contract instance
const getReadOnlyContract = () => {
    return new ethers.Contract(
        contractAddress,
        AuditTrailABI.abi,
        provider
    );
};

export { getReadOnlyContract, provider };
export default connectContract;
