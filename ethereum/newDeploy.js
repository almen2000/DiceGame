const Web3 = require('web3');
const DiceGame = require('./build/DiceGame.json');

let provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a8bc12d19ee2426eba8ab41aedce8f10');

const web3 = new Web3(provider);

let privatKey = '0x0CDC9A772C15F9409B328B0119A5486D15F2312E65F28C387C4D9BEAF17AE674';
let managerAccount = web3.eth.accounts.privateKeyToAccount(privatKey);

const transaction = {
    from: managerAccount.address,
    gas: 300000,
    data: 1
}