# Blockchain-Based Audit Trail System

This project is a decentralized application (dApp) designed to provide immutable audit trails for financial transactions. The goal is to create a transparent and reliable way for small and medium enterprises (SMEs) to track transaction history and ensure data integrity.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Deployment](#deployment)
5. [Running the Frontend](#running-the-frontend)
6. [Usage](#usage)
7. [Troubleshooting](#troubleshooting)
8. [Future Enhancements](#future-enhancements)

---

## Features

- **Immutable Ledger**: Record transactions securely using a blockchain-based system.
- **Transparency**: Provides SMEs with a tamper-proof way of tracking transaction history.
- **Frontend Interface**: Allows users to interact with the blockchain ledger via a user-friendly frontend.

## Requirements

- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/) (for connecting to the blockchain)
- Local blockchain (using Hardhat Network)

## Installation

Clone the repository to your local machine and install the necessary dependencies.

```bash
# Clone the repository
git clone <repository-url>

# Change into the project directory
cd scs2.0_audit_trails

# Install dependencies for both backend and frontend
npm install

#Compile the smart contract using Hardhat.

npx hardhat compile

#Deploy the smart contract to the local Hardhat network.

npx hardhat node

#This command will start a local blockchain instance and display a list of accounts with their private keys. Leave this terminal open, as it serves as your local blockchain.

#Deploy the Contract

#In a new terminal, deploy the contract to this local blockchain network.

npx hardhat run scripts/deploy.js --network localhost

#You should see output in the console indicating the contract’s address. Note this address, as you will need it to connect the frontend.
```
