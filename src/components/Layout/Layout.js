import React, {Component} from 'react';
import Web3 from 'web3';
import Timer from '../Timer/Timer';
import diceGame from '../../ethereum/eth_modules/diceGame';
import newGame from '../../ethereum/eth_modules/newGame';
import App from "../../containers/App/App";
import './Layout.css';

class Layout extends Component {

    nextGameMinimumBet = '700';
    dice1;
    dice2;

    state = {
        gameId: undefined,
        minimumBet: '',
        prevGameWinningValue: '',
        prevGameDice1: undefined,
        prevGameDice2: undefined,
    };

    componentDidMount = async () => {
        const id = await diceGame.methods.gameId().call();
        const game = await diceGame.methods.getGameById(id.toString()).call();
        const prevGame = await diceGame.methods.getGameById((id - 1).toString()).call();
        this.nextGameMinimumBet = game[3];
        this.setState({gameId: id, minimumBet: game[3], prevGameWinningValue: prevGame[0]});
    };

    showGame = (gameId, minimumBet, prevGameWinningValue, prevGameDice1, prevGameDice2) => {
        if (typeof prevGameDice1 === 'undefined' || typeof prevGameDice2 === 'undefined') {
            this.setState({gameId, minimumBet});
        } else {
            this.setState({gameId, minimumBet, prevGameWinningValue, prevGameDice1, prevGameDice2});
        }
    };

    setNewGame = async () => {
        this.dice1 = Math.floor(Math.random() * 6 + 1);
        this.dice2 = Math.floor(Math.random() * 6 + 1);
        const serverValue = (this.dice1 + this.dice2).toString();
        console.log('Sending Transaction...');
        await newGame(serverValue, this.nextGameMinimumBet);
        const id = Number(await diceGame.methods.gameId().call()) + 1;
        this.showGame(id, this.nextGameMinimumBet, this.dice1 + this.dice2, this.dice1, this.dice2);
        console.log('Transaction Sent.');
    };

    updateGame = async () => {
        console.log('Update');
        const id = Number(await diceGame.methods.gameId().call());
        const game = await diceGame.methods.getGameById(id.toString()).call();
        this.showGame(id, game[3]);
    };

    changeNextGameMinimumBet = (minimumBet) => {
        this.nextGameMinimumBet = minimumBet;
    };

    render() {
        const style = {
            display: 'inline-block'
        };

        let minimumBet = this.state.minimumBet;
        let unit = 'Wei';
        if (minimumBet.length > 7 && minimumBet.length < 16) {
            minimumBet = Web3.utils.fromWei(minimumBet, 'Gwei');
            unit = 'Gwei'
        } else if (minimumBet.length >= 16) {
            minimumBet = Web3.utils.fromWei(minimumBet, 'ether');
            unit = 'Ether'
        }
        unit = minimumBet + ' ' + unit;

        let dice = null;
        if (typeof this.state.prevGameDice1 !== 'undefined' && typeof this.state.prevGameDice2 !== 'undefined') {
            dice = (
                <p style={style} className='layoutImage'>
                    <img className='dice' src={require(`../../assets/dice_${this.state.prevGameDice1}.png`)} alt='Dice 1' />
                    <img className='dice' src={require(`../../assets/dice_${this.state.prevGameDice2}.png`)} alt='Dice 2' />
                </p>
            );
        }

        return (
            <div>
                <Timer style={style} updateGame={this.updateGame} setNewGame={this.setNewGame}/>
                <p style={style} className="paragraph">Game ID {this.state.gameId}</p>
                <p style={style} className="paragraph">MinimumBet {unit}</p>
                <p style={style} className="paragraph bl">Previous Game Winning Value {this.state.prevGameWinningValue}</p>
                {dice}
                <App style={style} state={this.state} changeMinimumBet={this.changeNextGameMinimumBet}/>
            </div>
        );
    }
}

export default Layout;

