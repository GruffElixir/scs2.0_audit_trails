

import { ethers } from "ethers";
import AuditTrailABI from "./contracts/AuditTrails.sol/AuditTrail.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

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

// Fetch transaction history by sender
const getTransactionHistoryBySender = async (sender) => {
    const contract = getReadOnlyContract();
    try {
        return await contract.getTransactionHistory(sender);
    } catch (error) {
        console.error("Error fetching transaction history by sender:", error);
        throw error;
    }
};

// Fetch transaction history by receiver
const getTransactionHistoryByReceiver = async (receiver) => {
    const contract = getReadOnlyContract();
    try {
        return await contract.getReceiverTransactionHistory(receiver);
    } catch (error) {
        console.error("Error fetching transaction history by receiver:", error);
        throw error;
    }
};

// Fetch transaction history by purpose
const getTransactionHistoryByPurpose = async (purpose) => {
    const contract = getReadOnlyContract();
    try {
        return await contract.getTransactionHistoryByPurpose(purpose);
    } catch (error) {
        console.error("Error fetching transaction history by purpose:", error);
        throw error;
    }
};

export {

    getReadOnlyContract, provider,
    getTransactionHistoryBySender,
    getTransactionHistoryByReceiver,
    getTransactionHistoryByPurpose,
};

// export { getReadOnlyContract, provider };
export default connectContract;