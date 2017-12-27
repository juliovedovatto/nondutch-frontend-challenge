import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import _ from 'underscore';


class Board extends Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
        data: PropTypes.array,
    };
  }

  render() {
    let data = this.props.data || [];

    data = data.map(item => { item.price_eur = Number(item.price_eur); return item; });

    let content = _.sortBy(data, 'price_eur').reverse().map(item => {
      let currencyChangeClass = `currency-status ${item.percent_change_24h > 0 ? 'up' : 'down'}`

      return (
        <li className="quote" key={item.id}>
          <h4 className="currency-title"><span>{item.name}</span> {item.symbol}</h4>
          <h5 className="currency-price">
            <NumberFormat value={item.price_eur} displayType={'text'} thousandSeparator={true} prefix={'€'} fixedDecimalScale={true} decimalScale={2}  />
          </h5>
          <h6 className={currencyChangeClass}><span>{item.percent_change_24h}%</span> in the last day</h6>
        </li>
      )
    })

    if (content.length < 12)
      content  = content.concat([].fill(<li className="quote empty-block"></li>, 0, 12 - content.length));

    return (
      <section>
        <h1 className="title">Cryptoboard</h1>
        <div className="currency-quote-list">
          {content}
        </div>
      </section>
    );
  }
}

export default Board;
