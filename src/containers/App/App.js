import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import GetGame from "../GetGame/getGame";
import SetGame from "../SetGame/setGame";
import BetEther from "../BetEther/betEther";
import './App.css'

const App = (props) => {
    const rmvUnderlines = {
        textDecoration: 'none',
        color: 'black'
    };

    return (
        <div>
            <Router>
                <button className="app"><Link className="link" style={rmvUnderlines} to="/">Bet Ether</Link></button>
                <button className="app"><Link className="link" style={rmvUnderlines} to="/users">Get Game By Id</Link></button>
                <button className="manager"><Link className="link" style={rmvUnderlines} to="/contact">Set Game MinimumBet</Link></button>
                <Route exact path="/" render={() => <BetEther gameId={props.gameId} minimumBet={props.minimumBet}/>}/>
                <Route path="/users" render={() => <GetGame gameId={props.gameId} minimumBet={props.minimumBet}/>}/>
                <Route path="/contact" render={() => <SetGame gameId={props.gameId} minimumBet={props.minimumBet}/>}/>
            </Router>
        </div>
    )
};

export default App;