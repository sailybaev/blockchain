require('dotenv').config();
const Web3 = require('web3').default; // Adjust Web3 import for v4.x
const fs = require('fs');
const path = require('path');

// Provider
const provider = 'http://127.0.0.1:7545'; // Ganache RPC URL
const web3 = new Web3(provider);

// Contract details
const contractAddress = '0xe4289f2195539BD0D797b010e01137a17776feF0'; // Replace with your deployed contract address
const contractABI = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../build/EtherWallet.abi'), 'utf8')
);
const account = process.env.ACCOUNT_ADDRESS; // Your Ganache account address
const privateKey = process.env.PRIVATE_KEY; // Your Ganache private key

const contract = new web3.eth.Contract(contractABI, contractAddress);

const interact = async () => {
  try {
    console.log('Interacting with contract:', contractAddress);

    const balance = await contract.methods.getBalance().call();
    console.log('Contract balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

    const txData = {
      from: account,
      to: contractAddress,
      value: web3.utils.toWei('0.1', 'ether'),
      gas: 500000,
      gasPrice: web3.utils.toWei('20', 'gwei'),
    };

    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);

    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction hash (sending Ether):', txReceipt.transactionHash);

    console.log('Attempting withdrawal...');
    const withdrawTx = await contract.methods.withdraw().send({
      from: account,
      gas: 500000,
      gasPrice: web3.utils.toWei('20', 'gwei'),
    });

    console.log('Withdrawal successful! Transaction hash:', withdrawTx.transactionHash);
  } catch (error) {
    console.error('Error during interaction:', error.message || error);
  }
};

interact();
