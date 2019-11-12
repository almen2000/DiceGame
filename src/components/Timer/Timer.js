import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {

    called = false;

    constructor(props) {
        super(props);
        this.state = {
            realSeconds: 10,
            showMins: 2,
            showSecs: 0,
        };
    }

    tick = async () => {

        if (this.state.realSeconds === 100) await this.props.updateGame();

        if (this.state.realSeconds === 0) {
            this.called = true;
            await this.props.setNewGame();
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
