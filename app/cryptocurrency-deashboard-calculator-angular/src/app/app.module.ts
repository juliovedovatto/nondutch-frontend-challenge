import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CalculatorComponent } from './calculator/calculator.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
