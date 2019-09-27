import web3 from './web3';
import DiceGame from './build/DiceGame.json';

const instance = new web3.eth.Contract(
  DiceGame.abi,
  '0xB1a6A24Ea7427f3f09CBB43Fb3b5d3d9930d304D'
);

export default instance;
