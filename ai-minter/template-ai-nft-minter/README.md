# Template for AI NFT Minter Blueprint

## Install dependencies

On the frontend folder run:

```
npm install
```

Python Environment - Used for the Backend and the Smart Contracts.

dependencies needed:

- moralis
- python_dotenv
- flask
- flask_cors
- eth-brownie

## Add your Keys

### For deploying your Smart Contracts

Rename the `.env.example` to `.env` on the main folder and add:

- Your Private key.
- Your Infura project ID.
- Your Etherscan Api key (optional)

### For the Backend

Rename the `.env.example` to `.env` on the main folder and add:

- STABILITY_API_KEY.
- MORALIS_API_KEY.
