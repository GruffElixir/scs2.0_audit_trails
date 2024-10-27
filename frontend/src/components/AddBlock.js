import React, { useState } from "react";
import connectContract from "../ContractConnector";

function AddBlock() {
	const [sender, setSender] = useState("");
	const [receiver, setReceiver] = useState("");
	const [amount, setAmount] = useState(0);
	const [purpose, setPurpose] = useState(""); // New state for purpose
	const [status, setStatus] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setStatus("Processing...");

		try {
			const contract = await connectContract();
			console.log("lavda lehsun");
			// Note the await here
			const tx = await contract.addBlock(
				sender,
				receiver,
				Number(amount),
				purpose,
				{
					gasLimit: 3000000,
				}
			);

			setStatus("Transaction submitted. Waiting for confirmation...");
			await tx.wait();

			setStatus("Block added successfully!");
			setSender("");
			setReceiver("");
			setAmount(0);
			setPurpose(""); // Clear purpose after transaction
		} catch (error) {
			console.error("Error adding block:", error);
			setStatus(`Failed to add block: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2>Add a New Block</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						placeholder="Sender"
						value={sender}
						onChange={(e) => setSender(e.target.value)}
						disabled={isLoading}
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Receiver"
						value={receiver}
						onChange={(e) => setReceiver(e.target.value)}
						disabled={isLoading}
					/>
				</div>
				<div>
					<input
						type="number"
						placeholder="Amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						disabled={isLoading}
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Purpose"
						value={purpose}
						onChange={(e) => setPurpose(e.target.value)} // New purpose field
						disabled={isLoading}
					/>
				</div>
				<button type="submit" disabled={isLoading}>
					{isLoading ? "Processing..." : "Add Block"}
				</button>
			</form>
			<p>{status}</p>
		</div>
	);
}

export default AddBlock;
