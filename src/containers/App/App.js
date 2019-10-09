// import React, { Component } from 'react';
// import './App.css';
// import Layout from '../../components/Layout/Layout';
// // import 'semantic-ui-css/semantic.min.css';

// class App extends Component {
//   render() {
//     return (
//       <Layout>
//         <div className="App">
//           <div style={{display: 'inline'}}>
//             Alexandr <p style={{display: 'inline'}}>Martirosyan</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
// }

// export default App;

import React from 'react';
import Layout from "../../components/Layout/Layout";

class App extends React.Component {

  state = {
    gameId: 0,
    minimumBet: 0
  };

  // componentDidMount = () => {
  //   const { gameId, minimumBet } = this.props;
  //   this.setState({ gameId, minimumBet })
  // };

  render() {

    console.log(this.props)

    return (
          <div>
            <h1>Home</h1>
            <h1>The game Id is {this.props.gameId}</h1>
            <h1>Minimum bet is {this.props.minimumBet}</h1>
            <h1>Ankap is {this.props.ankap}</h1>
          </div>
    )
  }
}

export default App;