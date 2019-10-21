import React, { Component } from 'react';
import './betEther.css';
import web3 from '../../ethereum/eth_modules/web3';
import diceGame from '../../ethereum/eth_modules/diceGame';
import leftPad from 'left-pad';
import getManagerAddress from "../../ethereum/eth_modules/managerAddress";

class BetEther extends Component {

    state = {
        managerAddress: null,
        bet: undefined,
        unit: 'wei',
        selectedNumber: undefined,
        error: null,
        success: null
    };

    componentDidMount = () => {
        this.setState({ managerAddress: getManagerAddress() });
    };

    handleInputChange = (event) => {
        this.setState({ bet: event.target.value.toString() });
    };

    handleNumberChange = (event) => {
        this.setState({ selectedNumber: event.target.value });
    };

    handleSelectorChange = (event) => {
        this.setState({ unit: event.target.value });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const [address] = await web3.eth.getAccounts();
        if (address !== this.state.managerAddress) {
            if (this.state.selectedNumber !== undefined && this.state.bet !== undefined && this.state.unit !== null && this.state.bet !== '') {
                if (this.state.bet >= 0) {
                    let hash = web3.utils.keccak256('0x' + leftPad((this.state.selectedNumber).toString(16), 64, 0));
                    let bet = this.state.bet === '' ? '0' : web3.utils.toWei(this.state.bet, this.state.unit);
                    if (Number(bet) >= Number(this.props.state.minimumBet)) {
                        if (!this.props.addresses.includes(address)) {
                            try {
                                await diceGame.methods.setUserBetAndHash(hash).send({
                                    from: address,
                                    value: bet
                                });
                                this.showSuccess(`You successfully bet from address ${address}`);
                                this.props.addAddress(address);
                            } catch (err) {
                                this.showError(err.toString());
                            }
                        } else this.showError('You already bet in this game');
                    } else this.showError('Bet is less than required minimum Bet');
                } else this.showError('Please do not enter negative number');
            } else this.showError('Some of your parameters are undefined');
        } else this.showError('You cannot bet because you are contract creator');
    };


    showError = (error) => {
        this.setState({ error });
        setTimeout(() => { this.setState({ error: null }); } ,5000);
    };

    showSuccess = (success) => {
        this.setState({ success });
        setTimeout(() => { this.setState({ success: null }); } ,5000);
    };

    render() {

        let err = null;
        if (this.state.error !== null) {
            err = <div className='betError'>{this.state.error}</div>;
        }

        let success = null;
        if (this.state.success !== null) {
            success = <div className='betSuccess'>{this.state.success}</div>;
        }

        return (
            <div>
                <div className='betEther'>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Enter  Your  Bet </label>
                        <input className='betInput' type="number" onChange={this.handleInputChange}/>
                        <select className='betSelector' name="ether" onChange={this.handleSelectorChange}>
                            <option value="wei">Wei</option>
                            <option value="gwei">Gwei</option>
                            <option value="ether">Ether</option>
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
                        <button className='betButton' type="submit">  Bet</button>
                    </form>
                </div>
                {success}
                {err}
            </div>
        )
    }
}

export default BetEther;