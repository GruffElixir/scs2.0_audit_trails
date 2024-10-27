import React from "react";
import AddBlock from "./components/AddBlock";
import DisplayBlocks from "./components/DisplayBlocks";
import GetChainLength from "./components/GetChainLength";
import GetAllTransactionHistory from "./components/GetAllTransactionHistory";
import GetTransactionsByAmountRange from "./components/GetTransactionsByAmountRange";
import TransactionHistory from './components/TransactionHistory';


function App() {
	return (
		<div className="App">
			<h1>Audit Trail DApp</h1>
			<AddBlock />
			<GetAllTransactionHistory />
			<GetTransactionsByAmountRange />
			<TransactionHistory />
			<DisplayBlocks />
			<GetChainLength />
			
		</div>
	);
}

export default App;
