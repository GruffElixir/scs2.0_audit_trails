// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuditTrail {
    struct Record {
        string sender;
        string receiver;
        uint256 amount;
        string purpose;  // Added purpose field
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
    uint256 public difficulty = 1;

    event BlockAdded(uint256 index, bytes32 blockHash, bytes32 prevHash);

    constructor() {
        bytes32 genesisHash = keccak256(abi.encodePacked("Genesis"));
        chain.push(Block({
            record: Record("Genesis", "Genesis", 0, "Genesis Block"),
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
        string memory purpose,
        address creatorId,
        bytes32 prevHash,
        uint256 timestamp,
        uint256 nonce
    ) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(sender, receiver, amount, purpose, creatorId, prevHash, timestamp, nonce));
    }

    function proofOfWork(bytes32 hash) private view returns (bool) {
        return uint8(uint256(hash) & 0xFF) < 256 - (difficulty * 16);
    }

    function addBlock(string memory sender, string memory receiver, uint256 amount, string memory purpose) public {
        Block memory prevBlock = chain[chain.length - 1];
        
        uint256 nonce = 0;
        bytes32 hash;
        uint256 timestamp = block.timestamp;
        
        uint256 maxIterations = 1000;
        bool found = false;
        
        for (uint256 i = 0; i < maxIterations; i++) {
            hash = calculateHash(sender, receiver, amount, purpose, msg.sender, prevBlock.blockHash, timestamp, nonce);
            if (proofOfWork(hash)) {
                found = true;
                break;
            }
            nonce++;
        }
        
        require(found, "Failed to find valid nonce within gas limits");

        Block memory newBlock = Block({
            record: Record(sender, receiver, amount, purpose),
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
                currentBlock.record.purpose,
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

    function calculateSummaries() public view returns (uint256 totalTransactions, uint256 totalVolume, uint256 avgTransactionValue) {
        totalTransactions = chain.length - 1; // Subtract genesis block
        for (uint256 i = 1; i < chain.length; i++) {
            totalVolume += chain[i].record.amount;
        }
        if (totalTransactions > 0) {
            avgTransactionValue = totalVolume / totalTransactions;
        }
    }

    function setDifficulty(uint256 _difficulty) public {
        require(_difficulty > 0, "Difficulty must be greater than zero");
        difficulty = _difficulty;
    }

    function getBlock(uint256 index) public view returns (
        string memory sender,
        string memory receiver,
        uint256 amount,
        string memory purpose,
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
            blockData.record.purpose,
            blockData.blockHash,
            blockData.prevHash,
            blockData.timestamp
        );
    }

    function getChainLength() public view returns (uint256) {
        return chain.length;
    }
    function searchTransactions(string memory sender, string memory receiver, string memory purpose) 
    public view returns (Record[] memory) {
    uint256 totalMatches = 0;

    // First, count how many matches we have
    for (uint256 i = 1; i < chain.length; i++) {
        Record memory record = chain[i].record;
        bool isMatch = true; // Changed variable name here

        if (bytes(sender).length > 0 && keccak256(abi.encodePacked(record.sender)) != keccak256(abi.encodePacked(sender))) {
            isMatch = false;
        }
        if (bytes(receiver).length > 0 && keccak256(abi.encodePacked(record.receiver)) != keccak256(abi.encodePacked(receiver))) {
            isMatch = false;
        }
        if (bytes(purpose).length > 0 && keccak256(abi.encodePacked(record.purpose)) != keccak256(abi.encodePacked(purpose))) {
            isMatch = false;
        }

        if (isMatch) {
            totalMatches++;
        }
    }

    // Create an array to store matched records
    Record[] memory matches = new Record[](totalMatches);
    uint256 index = 0;

    // Second, populate the matched records
    for (uint256 i = 1; i < chain.length; i++) {
        Record memory record = chain[i].record;
        bool isMatch = true; // Changed variable name here

        if (bytes(sender).length > 0 && keccak256(abi.encodePacked(record.sender)) != keccak256(abi.encodePacked(sender))) {
            isMatch = false;
        }
        if (bytes(receiver).length > 0 && keccak256(abi.encodePacked(record.receiver)) != keccak256(abi.encodePacked(receiver))) {
            isMatch = false;
        }
        if (bytes(purpose).length > 0 && keccak256(abi.encodePacked(record.purpose)) != keccak256(abi.encodePacked(purpose))) {
            isMatch = false;
        }

        if (isMatch) {
            matches[index] = record;
            index++;
        }
    }

    return matches;
    }
}
