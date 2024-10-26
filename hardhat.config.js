require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.27",
	networks: {
		mumbai: {
			url: "https://rpc-mumbai.maticvigil.com",
			accounts: [
				`0x1835db14e9393dba2cccc01edd1159f6bd03da11a0ca1ade297668c23cd3e25c`,
			], // Replace with your MetaMask private key
		},
	},
};
