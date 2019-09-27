import Web3, { providers } from 'web3';
import DiceGame from '../ethereum/build/DiceGame.json';

let provider = new providers.HttpProvider('https://rinkeby.infura.io/v3/a8bc12d19ee2426eba8ab41aedce8f10');

const web3 = new Web3(provider);

let privatKey = '0x0CDC9A772C15F9409B328B0119A5486D15F2312E65F28C387C4D9BEAF17AE674';
let contract = new web3.eth.Contract(
    DiceGame.abi,
    '0xB1a6A24Ea7427f3f09CBB43Fb3b5d3d9930d304D'
);

const signAndSendTransaction = async (senderPrivateKey, to, encodeABI, gas) => {
    let pk = senderPrivateKey;
    if ('0x' !== pk.slice(0, 2)) {
        pk = '0x' + pk;
    }

    let acc = web3.eth.accounts.privateKeyToAccount(pk);

    const transaction = {
        from: acc.address,
        to: to,
        gas: gas,
        data: encodeABI
    }

    let signed = await web3.eth.accounts.signTransaction(transaction, pk);
    console.log('signed is ', signed);
    let trn = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('trn is ', trn);
    return trn;
};

export const newGame = async (dice, minimumBet) => {
    if (dice < 1 || dice > 12 || isNaN(minimumBet)) return false;
    const tr = contract.methods.newGame(dice, minimumBet);
    console.log('method is ', tr);
    const addressTo = '0xB1a6A24Ea7427f3f09CBB43Fb3b5d3d9930d304D';

    return await signAndSendTransaction(privatKey, addressTo, tr.encodeABI(), 300000);
}

export const startGame = async (dice, minimumBet) => {
    if (dice < 1 || dice > 12 || isNaN(minimumBet)) return false;
    const tr = contract.methods.startGame(dice, minimumBet);
    console.log('method is ', tr);
    const addressTo = '0xB1a6A24Ea7427f3f09CBB43Fb3b5d3d9930d304D';

    return await signAndSendTransaction(privatKey, addressTo, tr.encodeABI(), 300000);
}
