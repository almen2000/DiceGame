import React, { Component } from 'react';
import './Layout.css';
import { newGame, startGame } from '../../ethereum/serverCallMethods';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            realSeconds: 120,
            showMins: 2,
            showSecs: 0
        };
    }

    tick = async () => {
        if (this.state.realSeconds === 0) {
            console.log('Started');
            
            await newGame('7', '999');

            console.log('end');
            

            this.setState(state => ({
                realSeconds: 120
            }));
        } else {
            this.setState(state => ({
                realSeconds: state.realSeconds - 1
            }));
        }
        let mins = Math.floor(this.state.realSeconds / 60);
        let secs = this.state.realSeconds % 60;
        this.setState(state => ({
            showMins: mins,
            showSecs: secs
        }));

    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const style = {
            color: 'blue'
        };

        if (this.state.realSeconds <= 30) style.color = 'red';

        return (
            <div>
                <p style={style}>Timer: {this.state.showMins}:{this.state.showSecs}</p>
            </div>
        );
    }
}

export default Timer;
