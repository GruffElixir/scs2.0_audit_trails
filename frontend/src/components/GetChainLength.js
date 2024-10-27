import React, { useState, useEffect } from "react";
import connectContract from "../ContractConnector";

function GetChainLength() {
	const [chainLength, setChainLength] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchChainLength = async () => {
			try {
				const contract = await connectContract();
				const length = await contract.getChainLength();
				setChainLength(length.toString()); // Convert BigNumber to string if necessary
			} catch (err) {
				console.error("Error fetching chain length:", err);
				setError("Could not fetch chain length");
			}
		};

		fetchChainLength();
	}, []);

	return (
		<div>
			<h2>Blockchain Length</h2>
			{error ? <p>{error}</p> : <p>{chainLength !== null ? chainLength : "Loading..."}</p>}
		</div>
	);
}

export default GetChainLength;
