import React from 'react';
import './getGame.css';
import diceGame from '../../ethereum/eth_modules/diceGame';
import web3 from "../../ethereum/eth_modules/web3";

class GetGame extends React.Component {

    state = {
        dice1: null,
        dice2: null,
        minimumBet: null,
        maximumBet: null,
        gameBalance: null,
        restBalance: null,
        gameCrashed: null,
        inputNumber: undefined,
        thisPageGameId: null,
        receivedGameId: null,
        password: null,
        error: null,
        success: null
    };

    componentDidMount = async () => {
        let gameId = this.props.gameId === undefined ? 1 : this.props.gameId > 0 ? this.props.gameId - 1 : this.props.gameId;
        const game = await diceGame.methods.getGameById(gameId.toString()).call();
        this.setState({
            thisPageGameId: gameId,
            dice1: game[0],
            dice2: game[1],
            minimumBet: game[2],
            maximumBet: game[3],
            gameBalance: game[4],
            restBalance: game[5],
            gameCrashed: game[6].toString()
        });
    };

    handleInputChange = (event) => {
        this.setState({inputNumber: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleGameIdChange = (event) => {
        this.setState({receivedGameId: event.target.value});
    };

    getGame = async (gameId) => {
        const game = await diceGame.methods.getGameById(gameId).call();
        this.setState({
            thisPageGameId: this.state.inputNumber,
            dice1: game[0],
            dice2: game[1],
            minimumBet: game[2],
            maximumBet: game[3],
            gameBalance: game[4],
            restBalance: game[5],
            gameCrashed: game[6].toString()
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.inputNumber === undefined || this.state.inputNumber === '') this.showError('Entered game id is undefined');
        else if (this.state.inputNumber < 0) this.showError('Please enter a positive number');
        else if (this.state.inputNumber > Number(this.props.gameId)) this.showError('The game not started');
        else {
            await this.getGame(this.state.inputNumber.toString());
        }
    };

    receiveMoney = async (event) => {
        event.preventDefault();
        const [address] = await web3.eth.getAccounts();
        try {
            if (this.state.receivedGameId != undefined) {
                if (this.state.receivedGameId < this.props.gameId && this.state.receivedGameId >= this.props.gameId - 3) {
                    if (this.state.password != undefined) {
                        if (this.state.receivedGameId < this.props.gameId) {
                            await diceGame.methods.receiveMoney(this.state.receivedGameId.toString(), this.state.password).send({from: address});
                            this.showSuccess(`You receive money from contract to address ${address}`);
                            await this.getGame(this.state.inputNumber.toString());
                        } else this.showError('Game not ended');
                    } else this.showError('Password is undefined');
                } else this.showError('You Cannot receive money from that game');
            } else this.showError('Game ID is undefined')
        } catch (err) {
            console.log(err);
            let error = (err.toString());
            if (error === 'Error: Internal JSON-RPC error.\n{\n  "originalError": {}\n}') this.showError(error);
            else this.showError('Something was wrong.\nYou do not receive the money\nYou are not a winner or you already receive the money');
        }
    };

    forceReceiveMoney = async () => {
        const [address] = await web3.eth.getAccounts();
        try {
            await diceGame.methods.forceReceiveMoney().send({ from: address });
            this.showSuccess('All players receive theirs money');
        } catch (err) {
            console.log(err);
            this.showError(err.toString());
        }
    };

    showError = (error) => {
        this.setState({error});
        setTimeout(() => {
            this.setState({error: null});
        }, 5000);
    };

    showSuccess = (success) => {
        this.setState({success});
        setTimeout(() => {
            this.setState({success: null});
        }, 5000);
    };

    render() {

        let success = null;
        if (this.state.success !== null) {
            success = <div className='getGameSuccess'>{this.state.success}</div>;
        }

        let err = null;
        if (this.state.error !== null) {
            let style = success !== null ? {marginTop: '21px'} : {marginTop: '165px'};
            err = <div className='getGameError' style={style}>{this.state.error}</div>;
        }

        return (
            <div>
                <div>
                    <form className='form'>
                        <label> Enter Game ID!</label><br/>
                        <input id='getGameInput' type="number" onChange={this.handleInputChange}/>
                        <button className='getGameButton' type="submit" onClick={this.handleSubmit}>Get Game</button>
                    </form>
                    <table className="center">
                        <tbody>
                        <tr>
                            <td className='bold'>Game Id</td>
                            <td className='numbers'>{this.state.thisPageGameId}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Winning value</td>
                            <td className='numbers'>{this.state.dice1}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Winning value</td>
                            <td className='numbers'>{this.state.dice2}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Minimum Bet</td>
                            <td className='numbers'>{this.state.minimumBet}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Minimum Bet</td>
                            <td className='numbers'>{this.state.maximumBet}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Game Balance</td>
                            <td className='numbers'>{this.state.gameBalance}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Rest Balance</td>
                            <td className='numbers'>{this.state.restBalance}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Game is Crashed</td>
                            <td className='numbers'>{this.state.gameCrashed}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button id={'forceReceive'} onClick={this.forceReceiveMoney}>Force Receive Money</button>
                    <span className={'receiveMoney'}>
                        <form onSubmit={this.receiveMoney}>
                            <span style={{marginRight: '11px', fontWeight: 'bold'}}>Game ID</span>
                            <input className={'getMoneyInput'} type={'number'} onChange={this.handleGameIdChange}/>
                            <br/>
                            <span style={{marginRight: '5px', fontWeight: 'bold'}}>Password</span>
                            <input className={'getMoneyInput'} type={"password"} onChange={this.handlePasswordChange}/>
                            <button id="receive" type={'submit'}>Receive Money</button>
                        </form>
                    </span>
                </div>
                {success}
                {err}
            </div>
        );
    }
}

export default GetGame;