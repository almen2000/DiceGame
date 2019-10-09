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

    showGameIdAndMinimumBet = (gameId, minimumBet) => {
        this.setState({gameId, minimumBet});
    };

    render() {
        const style = {
            display: 'inline'
        };

        return (
            <div>
                <Timer style={style} showItems={this.showGameIdAndMinimumBet}/>
                <p style={style} className="paragraph">Game ID {this.state.gameId}</p>
                <p style={style} className="paragraph">MinimumBet {this.state.minimumBet}</p>
                <Router>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <Route exact path="/" render={() => <App  gameId={this.state.gameId} minimumBet={this.state.minimumBet}/>}/>
                    <Route path="/users" render={() => <Users  gameId={this.state.gameId} minimumBet={this.state.minimumBet}/>}/>
                    <Route path="/contact" render={() => <Contact  gameId={this.state.gameId} minimumBet={this.state.minimumBet}/>}/>
                </Router>
            </div>
        );
    }
}

export default Layout;

