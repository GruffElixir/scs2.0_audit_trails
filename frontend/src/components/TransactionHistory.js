import React, { useState } from "react";
import {
    getTransactionHistoryBySender,
    getTransactionHistoryByReceiver,
    getTransactionHistoryByPurpose
} from ".//../ContractConnector";

const TransactionHistory = () => {
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [purpose, setPurpose] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    // Fetch transactions based on sender
    const fetchBySender = async () => {
        setError(null);
        try {
            const result = await getTransactionHistoryBySender(sender);
            setTransactions(result);
        } catch (err) {
            setError("Failed to fetch transactions by sender.");
        }
    };

    // Fetch transactions based on receiver
    const fetchByReceiver = async () => {
        setError(null);
        try {
            const result = await getTransactionHistoryByReceiver(receiver);
            setTransactions(result);
        } catch (err) {
            setError("Failed to fetch transactions by receiver.");
        }
    };

    // Fetch transactions based on purpose
    const fetchByPurpose = async () => {
        setError(null);
        try {
            const result = await getTransactionHistoryByPurpose(purpose);
            setTransactions(result);
        } catch (err) {
            setError("Failed to fetch transactions by purpose.");
        }
    };

    return (
        <div>
            <h2>Transaction History</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <div>
                <h3>Search by Sender</h3>
                <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Enter sender address"
                />
                <button onClick={fetchBySender}>Fetch Transactions</button>
            </div>

            <div>
                <h3>Search by Receiver</h3>
                <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Enter receiver address"
                />
                <button onClick={fetchByReceiver}>Fetch Transactions</button>
            </div>

            <div>
                <h3>Search by Purpose</h3>
                <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Enter purpose"
                />
                <button onClick={fetchByPurpose}>Fetch Transactions</button>
            </div>

            <h3>Transaction Results</h3>
            <ul>
                {transactions.length > 0 ? (
                    transactions.map((tx, index) => (
                        <li key={index}>
                            <strong>Sender:</strong> {tx.sender}, 
                            <strong> Receiver:</strong> {tx.receiver}, 
                            <strong> Amount:</strong> {tx.amount}, 
                            <strong> Purpose:</strong> {tx.purpose}
                        </li>
                    ))
                ) : (
                    <p>No transactions found.</p>
                )}
            </ul>
        </div>
    );
};

export default TransactionHistory;
