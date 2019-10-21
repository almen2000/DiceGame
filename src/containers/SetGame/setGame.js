import React, {Component} from 'react';
import './setGame.css';
import web3 from "../../ethereum/eth_modules/web3";
import getManagerAddress from "../../ethereum/eth_modules/managerAddress";

class SetGame extends Component {

    state = {
        success: null,
        error: null
    };

    unit = 'wei';
    inputValue = '';

    handleInputChange = (event) => {
        this.inputValue = event.target.value.toString();
    };

    handleSelectorChange = (event) => {
        this.unit = event.target.value;
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const [address] = await web3.eth.getAccounts();
        if (this.inputValue < 0) this.showError('Input value cannot be less than 0');
        else if (address !== getManagerAddress()) this.showError('Only contract creator can change this parameter');
        else if (this.inputValue === '') this.showError('Please enter minimum bet value');
        else {
            let minimumBet = web3.utils.toWei(this.inputValue, this.unit);
            this.props.changeMinimumBet(minimumBet);
            this.showSuccess('You successfully change next game minimum bet');
        }
    };

    showError = (error) => {
      this.setState({ error });
      setTimeout(() => { this.setState({error: null}); }, 5000);
    };

    showSuccess = (success) => {
      this.setState({ success });
      setTimeout(() => { this.setState({success: null}); }, 5000);
    };

    render() {

        let success = null;
        if (this.state.success !== null) {
            success = <div className='setGameSuccess'>{this.state.success}</div>;
        }

        let err = null;
        if (this.state.error !== null) {
            err = <div className='setGameError'>{this.state.error}</div>;
        }

        return (
            <div>
                <div className="setGame">
                    <form onSubmit={this.handleFormSubmit}>
                        <label id='label'>Enter Minimum Bet </label>
                        <input type="number" id='input' onChange={this.handleInputChange}/>
                        <select name="ether" id='select' onChange={this.handleSelectorChange}>
                            <option value="wei">Wei</option>
                            <option value="gwei">GWei</option>
                            <option value="ether">Ether</option>
                        </select>
                        <button type="submit" id='button'>Set Minimum Bet</button>
                    </form>
                </div>
                {success}
                {err}
            </div>
        );
    }
}

export default SetGame;