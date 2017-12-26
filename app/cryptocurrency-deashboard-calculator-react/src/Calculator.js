import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this._calculateCurrency = this._calculateCurrency.bind(this);

    this.state = {
      currencies: ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"],
      convertedAmount: '',
      convertedAmount1: ''
    };
  }

  static get propTypes() {
    return {
        currencyList: PropTypes.array,
    };
  }

  componentDidUpdate() {
    new Choices('select', {
      searchEnabled: false,
      itemSelectText: '',
      convertedAmount: ''
    });
  }

  _calculateCurrency() {
    let option1 = document.querySelector('#currency-list-1 select').value;
    let option2 = document.querySelector('#crypto-currency select').value;
    let option3 = document.querySelector('#currency-list-2 select').value;
    let amount = document.querySelector('#currency-list-1 input').value;

    if (!Number(amount)) {
      this.setState({ convertedAmount: '' })
      return false;
    }

    fetch(`https://api.coinmarketcap.com/v1/ticker/${option2}/?convert=${option1}`, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        let result = (response || []).shift();
        let value = result[`price_${option1.toLowerCase()}`] || false;

        if (!value) {
          return false;
        }

        this.setState({ convertedAmount: Number(amount) / value })

        if (option1 !== option3) {
          fetch(`https://api.coinmarketcap.com/v1/ticker/${option2}/?convert=${option3}`, { method: 'GET' })
          .then(response => response.json())
          .then(response => {
            let result = (response || []).shift();
            let value = result[`price_${option3.toLowerCase()}`] || false;

            if (!value) {
              return false;
            }

            this.setState({ convertedAmount1: this.state.convertedAmount * value });
          });
        } else {
          this.setState({ convertedAmount1: amount });
        }

      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    let currencyList = this.state.currencies.map(item => (<option value={item} key={item}>{item}</option>));
    let cryptoCurrencyList = this.props.currencyList.map(item => (<option value={item.id} key={item.id}>{item.title}</option>));
    let cryptoCurrencyListSimple = this.props.currencyList.map(item => (<option value={item.title} key={(['c-', item.id])}>{item.title}</option>));

    return (
      <aside>
        <h2 className="title">Cryptocalculator</h2>
        <form>
          <fieldset>
            <ol>
              <li id="currency-list-1">
                <select defaultValue="EUR" onChange={this._calculateCurrency}>
                {currencyList}
                </select>
                <NumberFormat thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} onChange={this._calculateCurrency} />
              </li>
              <li id="crypto-currency">
                <select defaultValue="bitcoin" onChange={this._calculateCurrency}>
                  {cryptoCurrencyList}
                </select>
                <NumberFormat value={this.state.convertedAmount} thousandSeparator={true} fixedDecimalScale={true} decimalScale={10} readOnly />
              </li>
              <li id="currency-list-2">
                <select defaultValue="BRL" onChange={this._calculateCurrency}>
                  <optgroup label="Monetary Currency">
                  {currencyList}
                  </optgroup>
                  <optgroup label="Crypto Currency">
                  {cryptoCurrencyListSimple}
                  </optgroup>
                </select>
                <NumberFormat value={this.state.convertedAmount1} thousandSeparator={true} fixedDecimalScale={true} decimalScale={10} readOnly  />
              </li>
            </ol>
          </fieldset>
        </form>
      </aside>
    );
  }
}

export default Calculator;
