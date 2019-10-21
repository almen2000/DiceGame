import React from 'react';
import './getGame.css';
import diceGame from '../../ethereum/eth_modules/diceGame';
import web3 from "../../ethereum/eth_modules/web3";

class GetGame extends React.Component {

    state = {
        inputNumber: undefined,
        thisPageGameId: null,
        winningValue: null,
        restBalance: null,
        gameBalance: null,
        minimumBet: null,
        error: null,
        success: null
    };

    componentDidMount = async () => {
        let gameId = this.props.gameId === undefined ? 0 : this.props.gameId > 0 ? this.props.gameId - 1 : this.props.gameId;
        const game = await diceGame.methods.getGameById(gameId.toString()).call();
        this.setState({
            thisPageGameId: gameId,
            winningValue: game[0],
            restBalance: game[1],
            gameBalance: game[2],
            minimumBet: game[3]
        });
    };

    handleInputChange = (event) => {
        this.setState({inputNumber: event.target.value});
    };

    getGame = async (gameId) => {
        const game = await diceGame.methods.getGameById(gameId).call();
        this.setState({
            thisPageGameId: this.state.inputNumber,
            winningValue: game[0],
            restBalance: game[1],
            gameBalance: game[2],
            minimumBet: game[3]
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

    receiveMoney = async () => {
        const [address] = await web3.eth.getAccounts();
        try {
            let isReceived = await diceGame.methods.receiveMoney(this.state.winningValue, this.state.thisPageGameId.toString()).send({ from: address });
            if (isReceived) {
                this.showSuccess(`You receive money from contract to address ${address}`);
                await this.getGame(this.state.inputNumber.toString());
            }
            else this.showError('Something was wrong.\nYou do not receive the money\nYou are not a winner or you already receive the money');
        } catch (err) {
            let error = (err.toString());
            if (error === 'Error: Internal JSON-RPC error.\n{\n  "originalError": {}\n}') this.showError(error);
            else this.showError('Something was wrong.\nYou do not receive the money\nYou are not a winner or you already receive the money');
        }
    };

    showError = (error) => {
        this.setState({ error });
        setTimeout(() => { this.setState({error: null}); }, 5000);
    };

    showSuccess = (success) => {
        this.setState({ success });
        setTimeout(() => { this.setState({success: null}); }, 5000);
    };

    render() {

        let success = null;
        if (this.state.success !== null) {
            success = <div className='getGameSuccess'>{this.state.success}</div>;
        }

        let err = null;
        if (this.state.error !== null) {
            let style = success !== null ? { marginTop: '21px' } : { marginTop: '110px' };
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
                            <td className='numbers'>{this.state.winningValue}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Minimum Bet</td>
                            <td className='numbers'>{this.state.minimumBet}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Game Balance</td>
                            <td className='numbers'>{this.state.gameBalance}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Rest Balance</td>
                            <td className='numbers'>{this.state.restBalance}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button id="receive" onClick={this.receiveMoney}>RECEIVE MONEY</button>
                </div>
                {success}
                {err}
            </div>
        );
    }
}

export default GetGame;