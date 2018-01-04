import React, { Component } from 'react';
import './App.css';
import HIVKnowledge from './poem-1/HIVKnowledge';

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
        <HIVKnowledge />
      </div>
    );
  }
}

export default App;
