import React, { Component } from 'react';
import '../Layout/Layout.css';
import newGame from '../../ethereum/eth_modules/newGame';
import diceGame from '../../ethereum/eth_modules/diceGame';

class Timer extends Component {

    called = false;

    constructor(props) {
        super(props);
        this.state = {
            realSeconds: 1000000000,
            showMins: 2,
            showSecs: 0,
            alreadyCalled: false,
        };
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    updateGameId = async () => {
        const id = Number(await diceGame.methods.gameId().call());
        const game = await diceGame.methods.getGameById(id.toString()).call();
        this.props.showItems(id, game[3]);
    };

    sendGameIdToLayout = async () => {
        const id = Number(await diceGame.methods.gameId().call()) + 1;
        const game = await diceGame.methods.getGameById(id.toString()).call();
        this.props.showItems(id, game[3]);
    };

    tick = async () => {

        if (this.state.realSeconds === 100) {
            console.log('Update');
            await this.updateGameId();
        }

        if (this.state.realSeconds === 0) {
            this.called = true;
            const serverValue = Math.floor(Math.random() * 12 + 1).toString();
            const minimumBet = '999';
            console.log('Sending Transaction...');
            await newGame(serverValue, minimumBet);
            await this.sendGameIdToLayout();
            console.log('Transaction Sent.');
            this.called = false;

            this.setState(() => ({
                realSeconds: 120
            }))
        } else {
            this.setState(state => ({
                realSeconds: state.realSeconds - 1,
            }));
        }

        let mins = Math.floor(this.state.realSeconds / 60);
        let secs = this.state.realSeconds % 60;
        this.setState({
            showMins: mins,
            showSecs: secs
        });
    };

    componentDidMount = async () => {
        this.interval = setInterval(() => {
            if (!this.called) {
                this.tick();
            }
        }, 1000);
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    render = () => {

        const style = {
            color: 'blue',
            display: 'inline'
        };

        let secs;
        if (this.state.showSecs < 10) {
            secs = '0' + this.state.showSecs;
        } else {
            secs = this.state.showSecs;
        }
         

        let res = this.state.realSeconds === 0 ? <p style={{display: 'inline', fontSize: '23px'}}>loading...</p> : <p style={style}>{this.state.showMins}:{secs}</p>;

        if (this.state.realSeconds <= 30) style.color = 'red';

        return (
            <div style={style} className='head'>
                Timer: {res}
            </div>
        );
    }
}

export default Timer;
