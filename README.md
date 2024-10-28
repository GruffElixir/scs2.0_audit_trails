# Blockchain-Based Audit Trail System

This project is a decentralized application (dApp) designed to provide immutable audit trails for financial transactions. The goal is to create a transparent and reliable way for small and medium enterprises (SMEs) to track transaction history and ensure data integrity.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Deployment](#deployment)
5. [Running the Frontend](#running-the-frontend)

---

## Features

- **Immutable Ledger**: Record transactions securely using a blockchain-based system.
- **Transparency**: Provides SMEs with a tamper-proof way of tracking transaction history.
- **Frontend Interface**: Allows users to interact with the blockchain ledger via a user-friendly frontend.

## Requirements

- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [Hardhat](https://hardhat.org/)
- Local blockchain (using Hardhat Network)

## Installation

Clone the repository to your local machine and install the necessary dependencies.

```bash
# Clone the repository
git clone https://github.com/GruffElixir/scs2.0_audit_trails.git

# Change into the project directory
cd scs2.0_audit_trails

# Install dependencies for both backend and frontend
npm install

#Compile the smart contract using Hardhat.
npm install --save-dev hardhat
npm install --save ethers

npx hardhat compile

#Deploy the smart contract to the local Hardhat network.

npx hardhat node

#This command will start a local blockchain instance and display a list of accounts with their private keys. Leave this terminal open, as it serves as your local blockchain.
```

## Deployment

Localhost deployment:

```bash
#Deploy the Contract

#In a new terminal, deploy the contract to this local blockchain network.

npx hardhat run scripts/deploy.js --network localhost

#You should see output in the console indicating the contract’s address. Note this address, as you will need it to connect the frontend.
```

In case you want to deploy on Polygon zkEVM Cardona Testnet:

Replace the accounts string with your metamask/wallet's private key in hardhat.config.js -> test object

```bash
#Deploy the Contract

#In a new terminal, deploy the contract to this local blockchain network.

npx hardhat run scripts/deploy.js --network test

#You should see output in the console indicating the contract’s address. Note this address, as you will need it to connect the frontend.
```

## Running the Frontend

Navigate to the Frontend Directory

```bash
cd frontend

#Ensure that ethers is installed in your frontend folder:
npm install ethers
```

In frontend/src/ContractConnector.js, by default we use http://localhost:8545 as the RPC URL.

```javascript
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
```

Now, start the React app.

```bash

npm start
```

This will open the frontend at http://localhost:3000, where you can interact with the smart contract.
