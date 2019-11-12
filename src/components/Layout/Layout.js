import React, {Component} from 'react';
import Web3 from 'web3';
import Timer from '../Timer/Timer';
import diceGame from '../../ethereum/eth_modules/diceGame';
import newGame from '../../ethereum/eth_modules/newGame';
import App from "../../containers/App/App";
import './Layout.css';

class Layout extends Component {

    dice1;
    dice2;

    state = {
        gameId: undefined,
        minimumBet: '',
        maximumBet: '',
        prevGameDice1: undefined,
        prevGameDice2: undefined,
        gameWasCrashed: '',
    };

    componentDidMount = async () => {
        const id = await diceGame.methods.gameId().call();
        const game = await diceGame.methods.getGameById(id.toString()).call();
        const prevGame = await diceGame.methods.getGameById((id - 1).toString()).call();
        this.setState({gameId: id, minimumBet: game[2], maximumBet: game[3], prevGameDice1: prevGame[0], prevGameDice2: prevGame[1], gameWasCrashed: prevGame[6]} );
    };

    showGame = (gameId, minimumBet, maximumBet, prevGameDice1, prevGameDice2) => {
        if (typeof prevGameDice1 === 'undefined' || typeof prevGameDice2 === 'undefined') {
            this.setState({gameId, minimumBet, maximumBet});
        } else {
            this.setState({gameId, minimumBet, maximumBet, prevGameDice1, prevGameDice2});
        }
    };

    setNewGame = async () => {
        this.dice1 = Math.floor(Math.random() * 6 + 1);
        this.dice2 = Math.floor(Math.random() * 6 + 1);
        console.log('Sending Transaction...');
        await newGame(this.dice1, this.dice2);
        const id = Number(await diceGame.methods.gameId().call()) + 1;
        this.showGame(id, this.state.minimumBet, this.state.maximumBet, this.dice1, this.dice2);
        console.log('Transaction Sent.');
    };

    updateGame = async () => {
        console.log('Update');
        const id = Number(await diceGame.methods.gameId().call());
        const game = await diceGame.methods.getGameById(id.toString()).call();
        this.showGame(id, game[2], game[3]);
    };

    render() {
        const style = { display: 'inline-block' };

        let minAndMaxBet = [this.state.minimumBet, this.state.maximumBet];
        let unit = new Array(2);
        for (let i = 0; i <= 1; i++) {
            unit[i] = 'Wei';
            if (minAndMaxBet[i].length > 7 && minAndMaxBet[i].length < 16) {
                minAndMaxBet[i] = Web3.utils.fromWei(minAndMaxBet[i], 'Gwei');
                unit[i] = 'Gwei'
            } else if (minAndMaxBet[i].length >= 16) {
                minAndMaxBet[i] = Web3.utils.fromWei(minAndMaxBet[i], 'ether');
                unit[i] = 'Ether'
            }
            unit[i] = minAndMaxBet[i] + ' ' + unit[i];
        }

        let dice1 = null, dice2 = null;
        let prevGame;
        if (typeof this.state.prevGameDice1 !== 'undefined' && typeof this.state.prevGameDice2 !== 'undefined') {
            if (this.state.prevGameDice1 === '0') {
                prevGame = <p style={style} className="paragraph">Previous game was crashed </p>
            } else {
                dice1 = <img className='dice' src={require(`../../assets/dice_${this.state.prevGameDice1}.png`)} alt='Dice 1' />;
                dice2 = <img className='dice' src={require(`../../assets/dice_${this.state.prevGameDice2}.png`)} alt='Dice 2' />;
                prevGame = (
                    <div style={style}>
                        <p style={style} className="paragraph bl">Previous Game Dice1 {dice1}</p>
                        <p style={style} className="paragraph bl">Previous Game Dice2 {dice2}</p>
                    </div>
                );
            }
        }

        return (
            <div>
                <Timer style={style} updateGame={this.updateGame} setNewGame={this.setNewGame}/>
                <p style={style} className="paragraph">Game ID {this.state.gameId}</p>
                <p style={style} className="paragraph">MinimumBet {unit[0]}</p>
                <p style={style} className="paragraph">MaximumBet {unit[1]}</p>
                {prevGame}
                <App style={style} state={this.state}/>
            </div>
        );
    }
}

export default Layout;

