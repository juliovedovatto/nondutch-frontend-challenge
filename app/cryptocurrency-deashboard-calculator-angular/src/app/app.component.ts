import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { CalculatorComponent } from './calculator/calculator.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(BoardComponent) board;
  @ViewChild(CalculatorComponent) calculator;

  currencyList: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=12&convert=EUR', { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        this.board.data = response.map(item => { item.price_eur = Number(item.price_eur); return item; })
          .sort((a, b) => a.price_eur < b.price_eur ? 1 : (a.price_eur > b.price_eur ? -1 : 0));

        this.currencyList = response.map(item => {
          return { title: item.symbol, id: item.id };
        }).sort();
      });
  }
}
