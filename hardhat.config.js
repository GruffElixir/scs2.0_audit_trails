require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.27",
	networks: {
		test: {
			url: "https://rpc.cardona.zkevm-rpc.com",
			accounts: [
				`0x1835db14e9393dba2cccc01edd1159f6bd03da11a0ca1ade297668c23cd3e25c`,
			], // Replace with your MetaMask private key
		},
		ganache: {
			url: "http://127.0.0.1:7545",
			timeout: 200000, // 200 seconds timeout (adjust if needed)
			accounts: [
				`0x728af18a6c8670557edf2723b8c8c333899876e112648dbc1060027a26d03142`,
			], // Use a private key from Ganache's list
		},
		localhost: {
			gas: 30000000, // Set a higher default gas limit
			gasPrice: 875000000, // Optional: Adjust the gas price as needed
		},
	},
};
