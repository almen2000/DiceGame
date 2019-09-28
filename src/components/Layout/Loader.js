import Loader from 'react-loader-spinner';
import React, { Component } from 'react';

class App extends Component {
  //other logic
    render() {
     return(
      <Loader
         type="Puff"
         color="#00BFFF"
         height={20}
         width={19}
      />
     );
    }
 };

 export default App;