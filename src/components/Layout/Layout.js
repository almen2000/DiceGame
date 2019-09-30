import React, { Component } from 'react';
import Timer from '../Timer/Timer';
import diceGame from '../../ethereum/diceGame';

class Layout extends Component {

    state = {
        gameId: 0,
        minimumBet: 0
    }

    componentDidMount = async () => {
        const id = await diceGame.methods.gameId().call();
        const game = await diceGame.methods.getGameById(id.toString()).call();
        this.setState({ gameId: id, minimumBet: game[3] });
    }

    showGameIdAndMinimumBet = (gameId, minimumBet) => {
        this.setState({ gameId, minimumBet });
    }

    render() {
        const style = {
            display: 'inline'
        }

        return(
            <div>
                <Timer style={style} showItems={this.showGameIdAndMinimumBet}></Timer>
                <p style={style} className="paragraph">Game ID {this.state.gameId}</p>
                <p style={style} className="paragraph">MinimumBet {this.state.minimumBet}</p>
                {this.props.children}
            </div>
        );
    }
};

export default Layout;

