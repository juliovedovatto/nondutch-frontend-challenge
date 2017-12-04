import React, { Component } from 'react';

class Calculator extends Component {
  render() {
    return (
      <aside>
        <h2 class="title">Cryptocalculator</h2>
        <form>
          <fieldset>
            <ol>
              <li>
                <select>
                  <option>Euro</option>
                  <option>BTC</option>
                  <option>DASH</option>
                </select>
                <input type="text" />
              </li>
              <li>
                <select>
                  <option>BTC</option>
                </select>
                <input type="text" />
              </li>
              <li>
                <select>
                  <option>DASH</option>
                </select>
                <input type="text" />
              </li>
            </ol>
          </fieldset>
        </form>
      </aside>
    );
  }
}

export default Calculator;
