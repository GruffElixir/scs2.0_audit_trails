// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditTrail {
    // Define the Record structure to store transaction data
    struct Record {
        string sender;
        string receiver;
        uint256 amount;
    }

    // Define the Block structure to store each block's data
    struct Block {
        Record record;      // Transaction details
        address creatorId;  // Address of the block creator
        string prevHash;    // Hash of the previous block
        uint256 timestamp;  // Timestamp of block creation
        uint256 nonce;      // Nonce for PoW (simulated)
        string blockHash;   // Hash of the current block
    }

    // Array to store the chain of blocks
    Block[] public chain;

    // Difficulty for proof of work
    uint256 public difficulty = 4;

    // Event to signal that a new block has been added
    event BlockAdded(uint256 index, string blockHash, string prevHash);

    // Constructor to initialize the blockchain with a genesis block
    constructor() {
        // Genesis block with placeholder values
        chain.push(Block({
            record: Record("Genesis", "Genesis", 0),
            creatorId: msg.sender,
            prevHash: "0",
            timestamp: block.timestamp,
            nonce: 0,
            blockHash: calculateHash("Genesis", "Genesis", 0, msg.sender, "0", block.timestamp, 0)
        }));
    }

    // Function to calculate hash for a block
    function calculateHash(
        string memory sender,
        string memory receiver,
        uint256 amount,
        address creatorId,
        string memory prevHash,
        uint256 timestamp,
        uint256 nonce
    ) private pure returns (string memory) {
        return string(abi.encodePacked(
            keccak256(abi.encodePacked(sender, receiver, amount, creatorId, prevHash, timestamp, nonce))
        ));
    }

    // Proof-of-Work simulation for block mining
    function proofOfWork(string memory hash) private view returns (bool) {
        bytes memory hashBytes = bytes(hash);
        for (uint256 i = 0; i < difficulty; i++) {
            if (hashBytes[i] != "0") {
                return false;
            }
        }
        return true;
    }

    // Function to add a new block to the chain
    function addBlock(string memory sender, string memory receiver, uint256 amount) public {
        // Get previous block's hash
        Block memory prevBlock = chain[chain.length - 1];
        string memory prevHash = prevBlock.blockHash;

        // Create a new block
        uint256 nonce = 0;
        string memory hash;
        do {
            hash = calculateHash(sender, receiver, amount, msg.sender, prevHash, block.timestamp, nonce);
            nonce++;
        } while (!proofOfWork(hash));

        Block memory newBlock = Block({
            record: Record(sender, receiver, amount),
            creatorId: msg.sender,
            prevHash: prevHash,
            timestamp: block.timestamp,
            nonce: nonce,
            blockHash: hash
        });

        chain.push(newBlock);

        emit BlockAdded(chain.length - 1, hash, prevHash);
    }

    // Function to verify the integrity of the chain
    function isValid() public view returns (bool) {
        for (uint256 i = 1; i < chain.length; i++) {
            Block memory currentBlock = chain[i];
            Block memory prevBlock = chain[i - 1];

            if (keccak256(abi.encodePacked(prevBlock.blockHash)) != keccak256(abi.encodePacked(currentBlock.prevHash))) {
                return false;
            }

            // Recalculate the hash of the current block and check if it matches
            string memory recalculatedHash = calculateHash(
                currentBlock.record.sender,
                currentBlock.record.receiver,
                currentBlock.record.amount,
                currentBlock.creatorId,
                currentBlock.prevHash,
                currentBlock.timestamp,
                currentBlock.nonce
            );
            if (keccak256(abi.encodePacked(recalculatedHash)) != keccak256(abi.encodePacked(currentBlock.blockHash))) {
                return false;
            }
        }
        return true;
    }

    // Function to get details of a specific block by index
    function getBlock(uint256 index) public view returns (string memory sender, string memory receiver, uint256 amount, string memory blockHash, string memory prevHash, uint256 timestamp) {
        require(index < chain.length, "Invalid block index");
        Block memory blockData = chain[index];
        return (
            blockData.record.sender,
            blockData.record.receiver,
            blockData.record.amount,
            blockData.blockHash,
            blockData.prevHash,
            blockData.timestamp
        );
    }

    // Function to get the length of the chain
    function getChainLength() public view returns (uint256) {
        return chain.length;
    }
}
