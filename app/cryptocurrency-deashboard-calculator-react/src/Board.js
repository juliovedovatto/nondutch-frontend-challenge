import React, { Component } from 'react';

class Board extends Component {
  render() {
    return (
      <section>
        <h1 class="title">Cryptoboard</h1>
        <div class="currency-quote-list">
          <li class="quote">
            <h4 class="currency-title"><span>Bitcoin</span> BTC</h4>
            <h5 class="currency-price">€5.711</h5>
            <h6 class="currency-status up"><span>1.65%</span> in the last day</h6>
          </li>
          <li class="quote empty-block"></li>
        </div>
      </section>
    );
  }
}

export default Board;
