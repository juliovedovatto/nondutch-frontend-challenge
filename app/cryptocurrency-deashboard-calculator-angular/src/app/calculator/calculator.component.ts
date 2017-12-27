import { Component, OnInit, AfterViewInit, OnChanges, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';

declare var Choices: any;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['../../assets/css/choices.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalculatorComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() currencyList: Array<any>;

  currencies: Array<any> = [
    'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW',
    'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'
  ];
  selectedCurrencyList: Object;
  selectedCurrency: String;
  selectedCurrencyConvert: String;
  convertedAmount: String;
  convertedAmount1: String;

  constructor() {
      this.selectedCurrencyList = { id: '', title: '' };
      this.selectedCurrency = 'EUR';
      this.selectedCurrencyConvert = 'BRL';
      this.convertedAmount = '';
      this.convertedAmount1 = '';
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currencyList.currentValue) {
      this.selectedCurrencyList = (changes.currencyList.currentValue.filter(item => item.id === 'bitcoin') || []).shift();

      window.setTimeout(function() {
        new Choices('select', {
          searchEnabled: false,
          itemSelectText: '',
          convertedAmount: ''
        });
      }, 100);
    }
  }

  ngAfterViewInit() { }

  _calculateCurrency() {
    const option1 = document.querySelector('#currency-list-1 select').value;
    const option2 = document.querySelector('#crypto-currency select').value;
    const option3 = document.querySelector('#currency-list-2 select').value;
    const amount = document.querySelector('#currency-list-1 input').value;

    if (!Number(amount)) {
      this.convertedAmount = '';
      this.convertedAmount1 = '';
      return false;
    }

    fetch(`https://api.coinmarketcap.com/v1/ticker/${option2}/?convert=${option1}`, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        const result = (response || []).shift();
        const value = result[`price_${option1.toLowerCase()}`] || false;

        if (!value) {
          return false;
        }

        this.convertedAmount = Number(amount) / value;

        if (option1 !== option3) {
          fetch(`https://api.coinmarketcap.com/v1/ticker/${option2}/?convert=${option3}`, { method: 'GET' })
          .then(response => response.json())
          .then(response => {
            const result = (response || []).shift();
            const value = result[`price_${option3.toLowerCase()}`] || false;

            if (!value) {
              return false;
            }

            this.convertedAmount1 = this.convertedAmount * value;
          });
        } else {
          this.convertedAmount1 = amount;
        }

      })
      .catch(error => {
        console.error(error);
      });
  }

}
