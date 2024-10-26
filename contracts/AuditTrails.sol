// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27; // Specify the compiler version

contract AuditTrail {
    struct Record {
        string sender;
        string receiver;
        uint256 amount;
        string purpose;
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
    address[3] public approvers; // Array to store the 3 trusted approvers' addresses
    uint256 public difficulty = 1;

    mapping(uint256 => mapping(address => bool)) public approvals; // Track approvals per block by each approver
    mapping(uint256 => uint8) public approvalCount; // Count approvals for each block

    event BlockAdded(uint256 index, bytes32 blockHash, bytes32 prevHash);

    constructor(address[3] memory _approvers) {
        approvers = _approvers;

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

    modifier onlyApprover() {
        require(isApprover(msg.sender), "Not an authorized approver");
        _;
    }

    function isApprover(address _addr) internal view returns (bool) {
        for (uint i = 0; i < approvers.length; i++) {
            if (approvers[i] == _addr) return true;
        }
        return false;
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

    function proposeBlock(
        string memory sender,
        string memory receiver,
        uint256 amount,
        string memory purpose
    ) public onlyApprover returns (uint256) {
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

        chain.push(newBlock); // Add block with no finalization yet
        return chain.length - 1; // Return index of the newly created block
    }

    function approveBlock(uint256 blockIndex) public onlyApprover {
        require(blockIndex < chain.length, "Invalid block index");
        require(!approvals[blockIndex][msg.sender], "Already approved by this approver");

        approvals[blockIndex][msg.sender] = true; // Record approver’s approval
        approvalCount[blockIndex] += 1;

        // Finalize the block only after all 3 approvals
        if (approvalCount[blockIndex] == 3) {
            emit BlockAdded(blockIndex, chain[blockIndex].blockHash, chain[blockIndex].prevHash);
        }
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
}
