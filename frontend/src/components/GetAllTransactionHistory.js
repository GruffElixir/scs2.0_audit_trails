import React, { useState } from "react";
import connectContract from "../ContractConnector";

function GetAllTransactionHistory() {
	const [transactions, setTransactions] = useState([]);
	const [status, setStatus] = useState("");

	const handleGetAllHistory = async () => {
		setStatus("Fetching all transactions...");
		try {
			const contract = await connectContract();
			const txHistory = await contract.getAllTransactions();

			// Log the retrieved transaction history for debugging
			console.log("Transaction History:", txHistory);

			// Ensure that the transactions are processed correctly
			const formattedTransactions = txHistory.map(tx => ({
				sender: tx.sender,
				receiver: tx.receiver,
				amount: tx.amount.toString(), // Convert to string for display
				purpose: tx.purpose,
			}));

			setTransactions(formattedTransactions);
			setStatus("All transactions retrieved successfully!");
		} catch (error) {
			console.error("Error fetching all transactions:", error);
			setStatus(`Failed to fetch transactions: ${error.message}`);
		}
	};

	return (
		<div>
			<h2>All Transaction History</h2>
			<button onClick={handleGetAllHistory}>Get All Transactions</button>
			<p>{status}</p>
			<ul>
				{transactions.map((tx, index) => (
					<li key={index}>
						<p>Sender: {tx.sender}</p>
						<p>Receiver: {tx.receiver}</p>
						<p>Amount: {tx.amount}</p>
						<p>Purpose: {tx.purpose}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default GetAllTransactionHistory;
