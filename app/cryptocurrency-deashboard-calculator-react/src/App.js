import React, { Component } from 'react';

import './App.css'
import Board from './Board'
import Calculador from './Calculator'

class App extends Component {
  render() {
    return (
      <main>
        <Board />
        <Calculador />
      </main>
    );
  }
}

export default App;
