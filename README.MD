# EtherWallet

## Team: Alikhan Sailybaev , Zarina Beketova , Alua Nurlybekova

This project demonstrates a basic Ether wallet smart contract that:
- Accepts Ether deposits.
- Allows the owner to withdraw the entire balance.
- Displays the contract's balance.

## Features
- Built with Solidity.
- Deployed using Web3.js and Ganache.
- Interaction scripts for deploying and interacting with the contract.

## Technologies Used
- [Solidity](https://www.soliditylang.org/) - Smart contract language.
- [Web3.js](https://web3js.readthedocs.io/) - Ethereum JavaScript API.
- [Ganache](https://www.trufflesuite.com/ganache) - Local blockchain for development.
- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management.

## Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [Solidity Compiler (`solc`)](https://docs.soliditylang.org/en/v0.8.17/installing-solidity.html) installed.
- [Ganache](https://www.trufflesuite.com/ganache) installed and running.

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/sailybaev/blockchain
    cd blockchain
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure Environment Variables:**
    - Create a [.env](http://_vscodecontentref_/0) file in the root directory.
    - Add the following variables:
      ```env
      PRIVATE_KEY=your_private_key_here
      ACCOUNT_ADDRESS=your_account_address_here
      ```

## Compilation

1. **Compile the Smart Contract:**
    ```bash
    solc --abi --bin -o build contracts/EtherWallet.sol
    ```

    - This will generate the ABI and bytecode for the `EtherWallet` contract in the `build` directory.

1. **Or compile it in remix using your net**    
    
    - copy and paste ABI and bytecode to the build/EtherWallet.json


## Deployment

1. **Start Ganache:**
    - Ensure Ganache is running on `http://127.0.0.1:7545`.

2. **Deploy the Contract:**
    ```bash
    node scripts/deploy.js
    ```
    - This will deploy the `EtherWallet` contract to the local blockchain.
    - Upon successful deployment, the contract address will be displayed.

## Interaction

1. **Interact with the Contract:**
    ```bash
    node scripts/interact.js
    ```
    - This script allows you to:
      - View contract methods.
      - Check the contract's balance.
      - Deposit Ether into the contract.
      - Withdraw Ether (if you are the owner).

## Troubleshooting

- **Invalid Opcode Error:**
  - Ensure that the Solidity compiler version matches the pragma version in `EtherWallet.sol`.
  - Recompile the contract to update the ABI and bytecode.
  - Verify that the `PRIVATE_KEY` and `ACCOUNT_ADDRESS` in the [.env](http://_vscodecontentref_/2) file are correct.
  - Restart Ganache to reset the blockchain state and redeploy the contract.

- **Deprecation Warnings:**
  - Update dependencies to replace deprecated modules.
    ```bash
    npm update
    ```


## License

This project is licensed under the MIT License.