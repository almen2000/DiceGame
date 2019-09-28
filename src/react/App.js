import React, { Component } from 'react';
import './App.css';
import Layout from '../components/Layout/Layout';
// import 'semantic-ui-css/semantic.min.css';

class App extends Component {


  render() {
    return (
      <Layout>
        <div className="App">
          <div style={{display: 'inline'}}>
            Alexandr <p style={{display: 'inline'}}>Martirosyan</p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;
