import React, { Component } from 'react';
import './App.css';
import SexWorkersSyphilis from './poem-1/SexWorkersSyphilis';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro">
          This is meaningless text.
        </p>
        <SexWorkersSyphilis />
      </div>
    );
  }
}

export default App;
