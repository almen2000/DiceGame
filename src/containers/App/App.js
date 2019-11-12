import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import GetGame from "../GetGame/getGame";
import BetEther from "../BetEther/betEther";
import './App.css';

class App extends Component {

    addresses = [];
    gameId = undefined;

    addAddress = (address) => {
        this.addresses.push(address);
    };

    render() {
        const rmvUnderlines = {
            textDecoration: 'none',
            color: 'black'
        };

        if (this.gameId === undefined) this.gameId = this.gameId = this.props.state.gameId;
        if (this.gameId != this.props.state.gameId) {
            console.log('Removing addresses');
            this.addresses = [];
            this.gameId = this.props.state.gameId;
        }


        return (
            <div>
                <Router>
                    <button className="app"><Link className="link" style={rmvUnderlines} to="/">Bet Ether</Link></button>
                    <button className="app"><Link className="link" style={rmvUnderlines} to="/getGame">Get Game By Id</Link></button>
                    <Route exact path="/" render={() => <BetEther state={this.props.state} addAddress={this.addAddress} addresses={this.addresses} />}/>
                    <Route path="/getGame" render={() => <GetGame gameId={this.props.state.gameId} />}/>
                </Router>
            </div>
        )
    };
}


export default App;