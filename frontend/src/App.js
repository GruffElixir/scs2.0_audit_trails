import React from "react";
import AddBlock from "./components/AddBlock";
import DisplayBlocks from "./components/DisplayBlocks";
import TransactionHistory from './components/TransactionHistory';

function App() {
	return (
		<div className="App">
			<h1>Audit Trail DApp</h1>
			<TransactionHistory />
			<AddBlock />
			<DisplayBlocks />
		</div>
	);
}

export default App;
