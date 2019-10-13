import React, {Component} from 'react';
import Timer from '../Timer/Timer';
import diceGame from '../../ethereum/eth_modules/diceGame';
import App from "../../containers/App/App";
import Users from "../../containers/Users/users";
import Contact from "../../containers/Contact/contact";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';


class Layout extends Component {

    state = {
        gameId: 0,
        minimumBet: 0
    };

    componentDidMount = async () => {
        const id = await diceGame.methods.gameId().call();
        const game = await diceGame.methods.getGameById(id.toString()).call();
        this.setState({gameId: id, minimumBet: game[3]});
    };

    showGame = (gameId, minimumBet) => {
        this.setState({gameId, minimumBet});
    };

    render() {
        const style = {
            display: 'inline'
        };



        return (
            <div>
                <Timer style={style} showItems={this.showGame}/>
                <p style={style} className="paragraph">Game ID {this.state.gameId}</p>
                <p style={style} className="paragraph">MinimumBet {this.state.minimumBet}</p>
                <App style={style} gameId={this.state.gameId} minimumBet={this.state.minimumBet} />
            </div>
        );
    }
}

export default Layout;

