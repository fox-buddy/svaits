import { Injectable } from '@angular/core';
import { IStock, IStockResults } from './IStockData'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stockCollection: IStock[] = [];
  private stockToCalculate: string;

  constructor() { }

  public addNewStockEntry(keyName: string) {
    this.stockCollection.push({
      stockName: keyName, inputData: {}, resultData: this.resultDataEmpty()
    });


  }

  public set stockCalcState(stockName: string) {
    this.stockToCalculate = stockName;
  }

  public getIndexOfStockDataBy(stockName: string) {

  }

  private inputDataEmpty() {

  }

  private resultDataEmpty(): IStockResults {
    return {
      fairValue: 0, eigenkapitalquote: 0
    };
  }
}
