require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.27",
	networks: {
		cardona: {
			url: "https://rpc.cardona.zkevm-rpc.com",
			accounts: [`YOUR_WALLET_PRIVATE_KEY_HERE`], // Replace with your MetaMask private key
		},
		ganache: {
			url: "http://127.0.0.1:7545",
			timeout: 200000, // 200 seconds timeout (adjust if needed)
			accounts: [`YOUR_WALLET_PRIVATE_KEY_HERE`], // Use a private key from Ganache's list
		},
		localhost: {
			gas: 30000000, // Set a higher default gas limit
			gasPrice: 875000000, // Optional: Adjust the gas price as needed
		},
	},
};
