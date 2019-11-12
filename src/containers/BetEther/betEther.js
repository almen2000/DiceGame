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
        password: undefined,
        unit: 'wei',
        selectedDice1: undefined,
        selectedDice2: undefined,
        error: null,
        success: null
    };

    componentDidMount = () => {
        this.setState({ managerAddress: getManagerAddress() });
    };

    handleInputChange = (event) => {
        this.setState({ bet: event.target.value.toString() });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleDice1Change = (event) => {
        this.setState({ selectedDice1: event.target.value });
    };

    handleDice2Change = (event) => {
        this.setState({ selectedDice2: event.target.value });
    };

    handleSelectorChange = (event) => {
        this.setState({ unit: event.target.value });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const [address] = await web3.eth.getAccounts();
        if (address !== this.state.managerAddress) {
            if (this.state.selectedDice1 !== undefined && this.state.selectedDice2 !== undefined && this.state.password != undefined && this.state.bet !== undefined && this.state.unit !== null && this.state.bet !== '') {
                if (this.state.bet >= 0) {
                    let hash = web3.utils.keccak256(this.state.password + this.state.selectedDice1 + this.state.selectedDice2);
                    console.log(hash);
                    console.log(web3.utils.keccak256("Alexandr12"));
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
                        <div>
                            <span style={{marginRight: '19px'}} >Enter Your Bet</span>
                            <input className='betInput' type="number" onChange={this.handleInputChange}/>
                            <select className='betSelector' name="ether" onChange={this.handleSelectorChange}>
                                <option value="wei">Wei</option>
                                <option value="gwei">Gwei</option>
                                <option value="ether">Ether</option>
                            </select>
                        </div>
                        <div>
                            <span style={{marginRight: '12px'}} >Enter Password</span>
                            <input className='betInput' style={{marginBottom: '21px'}} type='password' onChange={this.handlePasswordChange}/>
                        </div>
                        <div>
                            <span className='betDice'>Dice 1</span>
                            <label className="radio1">
                                <input type="radio" value="1"  checked={this.state.selectedDice1 === '1'} onChange={this.handleDice1Change}  />
                                1
                            </label>
                            <label className="radio1">
                                <input type="radio" value="2"  checked={this.state.selectedDice1 === '2'} onChange={this.handleDice1Change}  />
                                2
                            </label>
                            <label className="radio1">
                                <input type="radio" value="3"  checked={this.state.selectedDice1 === '3'} onChange={this.handleDice1Change}  />
                                3
                            </label>
                            <label className="radio1">
                                <input type="radio" value="4"  checked={this.state.selectedDice1 === '4'} onChange={this.handleDice1Change}  />
                                4
                            </label>
                            <label className="radio1">
                                <input type="radio" value="5"  checked={this.state.selectedDice1 === '5'} onChange={this.handleDice1Change}  />
                                5
                            </label>
                            <label className="radio1">
                                <input type="radio" value="6"  checked={this.state.selectedDice1 === '6'} onChange={this.handleDice1Change}  />
                                6
                            </label>
                        </div>
                        <div>
                            <span className='betDice'>Dice 2</span>
                            <label className="radio2">
                                <input type="radio" value="1"  checked={this.state.selectedDice2 === '1'} onChange={this.handleDice2Change}  />
                                1
                            </label>
                            <label className="radio2">
                                <input type="radio" value="2"  checked={this.state.selectedDice2 === '2'} onChange={this.handleDice2Change}  />
                                2
                            </label>
                            <label className="radio2">
                                <input type="radio" value="3"  checked={this.state.selectedDice2 === '3'} onChange={this.handleDice2Change}  />
                                3
                            </label>
                            <label className="radio2">
                                <input type="radio" value="4"  checked={this.state.selectedDice2 === '4'} onChange={this.handleDice2Change}  />
                                4
                            </label>
                            <label className="radio2">
                                <input type="radio" value="5"  checked={this.state.selectedDice2 === '5'} onChange={this.handleDice2Change}  />
                                5
                            </label>
                            <label className="radio2">
                                <input type="radio" value="6"  checked={this.state.selectedDice2 === '6'} onChange={this.handleDice2Change}  />
                                6
                            </label>
                            <button className='betButton' type="submit">  Bet</button>
                        </div>
                    </form>
                </div>
                {success}
                {err}
            </div>
        )
    }
}

export default BetEther;