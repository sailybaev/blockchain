require('dotenv').config(); 
const Web3 = require('web3').default;
const fs = require('fs');
const path = require('path');

const provider = 'http://127.0.0.1:7545'; 
const web3 = new Web3(provider);

const contractABI = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../build/EtherWallet.abi'), 'utf8')
);
const contractBytecode = fs.readFileSync(
  path.resolve(__dirname, '../build/EtherWallet.bin'),
  'utf8'
);

const privateKey = process.env.PRIVATE_KEY;

const deploy = async () => {
  try {
    if (!privateKey) {
      throw new Error('Missing PRIVATE_KEY in .env file.');
    }

    // Add account using private key
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    console.log('from account:', account.address);

    // Initialize contract instance
    const contract = new web3.eth.Contract(contractABI);


    const receipt = await contract
      .deploy({ data: '0x' + contractBytecode }) 
      .send({
        from: account.address,
        gas: 4000000, 
        gasPrice: web3.utils.toWei('30', 'gwei'), 
      });

    console.log('Contract Address:', receipt.options.address);

    fs.writeFileSync(
      path.resolve(__dirname, '../build/deployedAddress.txt'),
      receipt.options.address
    );
    console.log('Contract address saved to build/deployedAddress.txt');
  } catch (error) {
    console.error('Deployment Error:', error.message);
  }
};

deploy();
