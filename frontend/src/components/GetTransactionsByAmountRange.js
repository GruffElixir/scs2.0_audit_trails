import React, { useState } from "react";
import connectContract from "../ContractConnector";

function GetTransactionsByAmountRange() {
	const [minAmount, setMinAmount] = useState(0);
	const [maxAmount, setMaxAmount] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [status, setStatus] = useState("");

	const handleGetTransactionsByAmountRange = async (event) => {
		event.preventDefault(); // Prevent default form submission
		setStatus("Fetching transactions...");
		try {
			const contract = await connectContract();
			const txHistory = await contract.getTransactionsByAmountRange(minAmount, maxAmount);

			// Log the retrieved transaction history for debugging
			console.log("Transactions in range:", txHistory);

			// Format the transactions for display
			const formattedTransactions = txHistory.map(tx => ({
				sender: tx.sender,
				receiver: tx.receiver,
				amount: tx.amount.toString(), // Convert to string for display
				purpose: tx.purpose,
			}));

			setTransactions(formattedTransactions);
			setStatus("Transactions retrieved successfully!");
		} catch (error) {
			console.error("Error fetching transactions:", error);
			setStatus(`Failed to fetch transactions: ${error.message}`);
		}
	};

	return (
		<div>
			<h2>Get Transactions by Amount Range</h2>
			<form onSubmit={handleGetTransactionsByAmountRange}>
				<div>
					<input
						type="number"
						placeholder="Min Amount"
						value={minAmount}
						onChange={(e) => setMinAmount(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						type="number"
						placeholder="Max Amount"
						value={maxAmount}
						onChange={(e) => setMaxAmount(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Get Transactions</button>
			</form>
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

export default GetTransactionsByAmountRange;
