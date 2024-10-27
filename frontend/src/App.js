import React from "react";
import AddBlock from "./components/AddBlock";
import DisplayBlocks from "./components/DisplayBlocks";

function App() {
	return (
		<div className="App">
			<h1>Audit Trail DApp</h1>
			<AddBlock />
			<DisplayBlocks />
		</div>
	);
}

export default App;
