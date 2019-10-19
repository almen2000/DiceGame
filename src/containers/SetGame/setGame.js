import React from 'react';
import './setGame.css';

class SetGame extends React.Component {
  render() {
    return (
      <div className="setGame">
        <form >
          <label id='label'>Enter Minimum Bet </label>
          <input type="number" id='input'/>
          <select name="ether" id='select'>
            <option value="Wei">Wei</option>
            <option value="GWei">GWei</option>
            <option value="Ether">Ether</option>
          </select>
          <button type="submit" id='button'>Set Minimum Bet</button>
        </form>
      </div>
    );
  }
}

export default SetGame;