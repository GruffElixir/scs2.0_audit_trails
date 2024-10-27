import React, { useEffect, useState } from "react";
import { getReadOnlyContract } from "../ContractConnector";

function DisplayBlocks() {
    const [blocks, setBlocks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlocks = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const contract = getReadOnlyContract();
            
            const chainLength = await contract.getChainLength();
            const blockPromises = [];
            
            for (let i = 0; i < chainLength; i++) {
                blockPromises.push(contract.getBlock(i));
            }

            const blockResults = await Promise.all(blockPromises);
            
            const blockData = blockResults.map(block => ({
                sender: block[0],
                receiver: block[1],
                amount: block[2].toString(),
                blockHash: block[3],
                prevHash: block[4],
                timestamp: new Date(Number(block[5]) * 1000).toLocaleString()
            }));

            setBlocks(blockData);
        } catch (error) {
            console.error("Error fetching blocks:", error);
            setError(`Failed to fetch blocks: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlocks();
        
        // Optional: Set up polling to refresh blocks periodically
        const interval = setInterval(fetchBlocks, 10000); // Refresh every 10 seconds
        
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading && blocks.length === 0) {
        return <div>Loading blocks...</div>;
    }

    return (
        <div>
            <h2>Blockchain Audit Trail</h2>
            <button onClick={fetchBlocks}>Refresh Blocks</button>
            {blocks.length === 0 ? (
                <p>No blocks found in the chain.</p>
            ) : (
                blocks.map((block, index) => (
                    <div key={index} className="block-card">
                        <h3>Block #{index}</h3>
                        <p>
                            <strong>Sender:</strong> {block.sender}
                        </p>
                        <p>
                            <strong>Receiver:</strong> {block.receiver}
                        </p>
                        <p>
                            <strong>Amount:</strong> {block.amount}
                        </p>
                        <p>
                            <strong>Block Hash:</strong>{" "}
                            <span className="hash">{block.blockHash}</span>
                        </p>
                        <p>
                            <strong>Previous Hash:</strong>{" "}
                            <span className="hash">{block.prevHash}</span>
                        </p>
                        <p>
                            <strong>Timestamp:</strong> {block.timestamp}
                        </p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default DisplayBlocks;