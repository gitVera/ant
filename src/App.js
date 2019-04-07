import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from './containers/ReactTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactTable />
      </div>
    );
  }
}

export default App;
