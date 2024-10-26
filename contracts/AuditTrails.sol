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
    function getTransactionHistory(string memory sender) public view returns (Record[] memory) {
    // Create a dynamic array to hold all matching records
    Record[] memory senderHistory = new Record[](chain.length - 1); // Excluding the genesis block
    uint256 count = 0;

    // Iterate through the chain to find transactions for the specified sender
    for (uint256 i = 1; i < chain.length; i++) {
        if (keccak256(abi.encodePacked(chain[i].record.sender)) == keccak256(abi.encodePacked(sender))) {
            senderHistory[count] = chain[i].record;
            count++;
        }
    }

    // Create a smaller array to return only the records that were found
    Record[] memory result = new Record[](count);
    for (uint256 j = 0; j < count; j++) {
        result[j] = senderHistory[j];
    }
    
    return result;
    }
    function getReceiverTransactionHistory(string memory receiver) public view returns (Record[] memory) {
    // Create a dynamic array to hold all matching records
    Record[] memory receiverHistory = new Record[](chain.length - 1); // Excluding the genesis block
    uint256 count = 0;

    // Iterate through the chain to find transactions for the specified receiver
    for (uint256 i = 1; i < chain.length; i++) {
        if (keccak256(abi.encodePacked(chain[i].record.receiver)) == keccak256(abi.encodePacked(receiver))) {
            receiverHistory[count] = chain[i].record;
            count++;
        }
    }

    // Create a smaller array to return only the records that were found
    Record[] memory result = new Record[](count);
    for (uint256 j = 0; j < count; j++) {
        result[j] = receiverHistory[j];
    }
    
    return result;
    }
    function getTransactionHistoryByPurpose(string memory purpose) public view returns (Record[] memory) {
    // Create a dynamic array to hold all matching records
    Record[] memory purposeHistory = new Record[](chain.length - 1); // Excluding the genesis block
    uint256 count = 0;

    // Iterate through the chain to find transactions with the specified purpose
    for (uint256 i = 1; i < chain.length; i++) {
        if (keccak256(abi.encodePacked(chain[i].record.purpose)) == keccak256(abi.encodePacked(purpose))) {
            purposeHistory[count] = chain[i].record;
            count++;
        }
    }

    // Create a smaller array to return only the records that were found
    Record[] memory result = new Record[](count);
    for (uint256 j = 0; j < count; j++) {
        result[j] = purposeHistory[j];
    }
    
    return result;
    }



}
