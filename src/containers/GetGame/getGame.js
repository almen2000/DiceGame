import React from 'react';
import './getGame.css';
import diceGame from '../../ethereum/eth_modules/diceGame';

class GetGame extends React.Component {

    state = {
        currentPageId: '',
        winningValue: '',
        restBalance: '',
        gameBalance: '',
        minimumBet: '',
        sexmelEsGetGame: false
    };

    getDiceGame = async (gameId) => {
        const game = await diceGame.methods.getGameById(gameId.toString()).call();
        console.log('get Game = ' + game);
        this.setState({
            currentPageId: gameId,
            winningValue: game[0],
            restBalance: game[1],
            gameBalance: game[2],
            minimumBet: game[3]
        });
    };

    // componentDidMount = async () => {
    //   await this.getDiceGame(this.props.gameId);
    // };

    anelGetGame = async (event) => {
      event.preventDefault();
      await this.getDiceGame(this.props.gameId);
      this.setState({ sexmelEsGetGame: true })
    };

  render() {
    console.log(this.props);

    let game = (
          <table className="center">
            <tbody>
            <tr>
              <td className='bold'>Game Id</td>
              <td className='numbers'>{this.state.currentPageId}</td>
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
    );

    if (!this.state.sexmelEsGetGame) game = null;

      return (
         <div>

            <form className='form' >
              <label > Enter Game ID!</label><br/>
              <input type="text"/>
              <button type="submit" onClick={this.anelGetGame}>Get Game</button>
            </form>
            {game}
         </div>
      );
  }
}

export default GetGame;