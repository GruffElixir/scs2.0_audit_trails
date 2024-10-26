// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditTrail {
    struct Record {
        string sender;
        string receiver;
        uint256 amount;
    }

    struct Block {
        Record record;
        address creatorId;
        bytes32 prevHash;
        uint256 timestamp;
        uint256 nonce;
        bytes32 blockHash;
    }

    Block[] public chain;
    uint256 public difficulty = 1; // Reduced to minimum for testing

    event BlockAdded(uint256 index, bytes32 blockHash, bytes32 prevHash);

    constructor() {
        bytes32 genesisHash = keccak256(abi.encodePacked("Genesis"));
        chain.push(Block({
            record: Record("Genesis", "Genesis", 0),
            creatorId: msg.sender,
            prevHash: bytes32(0),
            timestamp: block.timestamp,
            nonce: 0,
            blockHash: genesisHash
        }));
    }

    function calculateHash(
        string memory sender,
        string memory receiver,
        uint256 amount,
        address creatorId,
        bytes32 prevHash,
        uint256 timestamp,
        uint256 nonce
    ) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(sender, receiver, amount, creatorId, prevHash, timestamp, nonce));
    }

    function proofOfWork(bytes32 hash) private view returns (bool) {
        // Simplified PoW - just check if the last byte is less than a target
        return uint8(uint256(hash) & 0xFF) < 256 - (difficulty * 16);
    }

    function addBlock(string memory sender, string memory receiver, uint256 amount) public {
        Block memory prevBlock = chain[chain.length - 1];
        
        uint256 nonce = 0;
        bytes32 hash;
        uint256 timestamp = block.timestamp;
        
        // Reduced max iterations
        uint256 maxIterations = 100;
        bool found = false;
        
        for (uint256 i = 0; i < maxIterations; i++) {
            hash = calculateHash(sender, receiver, amount, msg.sender, prevBlock.blockHash, timestamp, nonce);
            if (proofOfWork(hash)) {
                found = true;
                break;
            }
            nonce++;
        }
        
        require(found, "Failed to find valid nonce within gas limits");

        Block memory newBlock = Block({
            record: Record(sender, receiver, amount),
            creatorId: msg.sender,
            prevHash: prevBlock.blockHash,
            timestamp: timestamp,
            nonce: nonce,
            blockHash: hash
        });

        chain.push(newBlock);
        emit BlockAdded(chain.length - 1, hash, prevBlock.blockHash);
    }

    function isValid() public view returns (bool) {
        for (uint256 i = 1; i < chain.length; i++) {
            Block memory currentBlock = chain[i];
            Block memory prevBlock = chain[i - 1];

            if (currentBlock.prevHash != prevBlock.blockHash) {
                return false;
            }

            bytes32 recalculatedHash = calculateHash(
                currentBlock.record.sender,
                currentBlock.record.receiver,
                currentBlock.record.amount,
                currentBlock.creatorId,
                currentBlock.prevHash,
                currentBlock.timestamp,
                currentBlock.nonce
            );
            
            if (recalculatedHash != currentBlock.blockHash) {
                return false;
            }
        }
        return true;
    }

    function getBlock(uint256 index) public view returns (
        string memory sender,
        string memory receiver,
        uint256 amount,
        bytes32 blockHash,
        bytes32 prevHash,
        uint256 timestamp
    ) {
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

    function getChainLength() public view returns (uint256) {
        return chain.length;
    }
}