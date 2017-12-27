import { Component, OnInit, AfterViewInit, OnChanges, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['../../assets/css/choices.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalculatorComponent implements OnInit, AfterViewInit, OnChanges, Input {

  @Input() currencyList: array;

  currencies: array = [
    'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW',
    'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'
  ];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currencyList.currentValue) {
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

}
