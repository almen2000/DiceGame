import React, { Component } from 'react';

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

    console.log(this.props)

    return (
          <div>
            <h1>Home</h1>
            <h1>The game Id is {this.props.gameId}</h1>
            <h1>Minimum bet is {this.props.minimumBet}</h1>
          </div>
    )
  }
}

export default App;