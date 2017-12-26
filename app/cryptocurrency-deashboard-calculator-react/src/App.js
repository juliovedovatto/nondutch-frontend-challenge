import React, { Component } from 'react';

import './App.scss'
import Board from './Board'
import Calculador from './Calculator'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currencyList: []
    };
  }

  componentWillMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=12&convert=EUR', { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response,
          currencyList: response.map(item => {
            return { title: item.symbol, id: item.id }
          })
        });
      })
  }

  render() {
    return (
      <main>
        <Board data={this.state.data} />
        <Calculador currencyList={this.state.currencyList} />
      </main>
    );
  }
}

export default App;
