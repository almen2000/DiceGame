import React, { Component } from 'react';
import './betEther.css';

class BetEther extends Component {

    state = {
        gameId: 0,
        minimumBet: 0,
        selectedNumber: '',
    };

    // componentDidMount = () => {
    //   const { gameId, minimumBet } = this.props;
    //   this.setState({ gameId, minimumBet })
    // };

    handleNumberChange = (event) => {
        this.setState({ selectedNumber: event.target.value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Submit is ' + this.state.selectedNumber);
    };

    render() {

        return (
            <div className='betEther'>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Enter  Your  Bet </label>
                    <input type="text"/>
                    <select name="ether">
                        <option value="Wei">Wei</option>
                        <option value="Gwei">Gwei</option>
                        <option value="Ether">Ether</option>
                    </select>
                    <br/>
                    <label className="radio">
                        <input type="radio" value="2"  checked={this.state.selectedNumber === '2'} onChange={this.handleNumberChange}  />
                        2
                    </label>
                    <label className="radio">
                        <input type="radio" value="3"  checked={this.state.selectedNumber === '3'} onChange={this.handleNumberChange}  />
                        3
                    </label>
                    <label className="radio">
                        <input type="radio" value="4"  checked={this.state.selectedNumber === '4'} onChange={this.handleNumberChange}  />
                        4
                    </label>
                    <label className="radio">
                        <input type="radio" value="5"  checked={this.state.selectedNumber === '5'} onChange={this.handleNumberChange}  />
                        5
                    </label>
                    <label className="radio">
                        <input type="radio" value="6"  checked={this.state.selectedNumber === '6'} onChange={this.handleNumberChange}  />
                        6
                    </label>
                    <label className="radio">
                        <input type="radio" value="7"  checked={this.state.selectedNumber === '7'} onChange={this.handleNumberChange}  />
                        7
                    </label>
                    <label className="radio">
                        <input type="radio" value="8"  checked={this.state.selectedNumber === '8'}  onChange={this.handleNumberChange} />
                        8
                    </label>
                    <label className="radio">
                        <input type="radio" value="9"  checked={this.state.selectedNumber === '9'} onChange={this.handleNumberChange}  />
                        9
                    </label>
                    <label className="radio">
                        <input type="radio" value="10" checked={this.state.selectedNumber === '10'} onChange={this.handleNumberChange}  />
                        10
                    </label>
                    <label className="radio">
                        <input type="radio" value="11" checked={this.state.selectedNumber === '11'} onChange={this.handleNumberChange}  />
                        11
                    </label>
                    <label className="radio">
                        <input type="radio" value="12" checked={this.state.selectedNumber === '12'} onChange={this.handleNumberChange}  />
                        12
                    </label>
                    <button type="submit" style={{ margin: '30px' }}>  Bet</button>


                </form>
            </div>
        )
    }
}

export default BetEther;