import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Users from "../Users/users";
import Contact from "../Contact/contact";
import HomePage from "../HomePage/homePage";
import Layout from "../../components/Layout/Layout";

class App extends Component {

  state = {
    gameId: 0,
    minimumBet: 0
  };

  // componentDidMount = () => {
  //   const { gameId, minimumBet } = this.props;
  //   this.setState({ gameId, minimumBet })
  // };

  render() {

    console.log(this.props);

    return (
        <div>
            <Router>
                <Route exact path="/" render={() => <HomePage  gameId={this.props.gameId} minimumBet={this.props.minimumBet}/>}/>
                <Route path="/users" render={() => <Users  gameId={this.props.gameId} minimumBet={this.props.minimumBet}/>}/>
                <Route path="/contact" render={() => <Contact  gameId={this.props.gameId} minimumBet={this.props.minimumBet}/>}/>
            </Router>
        </div>
    )
  }
}

export default App;