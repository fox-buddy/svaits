import { Injectable } from '@angular/core';
import { IStock } from './IStockData'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stockCollection: IStock[] = [];

  constructor() { }

  public addNewStockEntry(keyName: string) {
    this.stockCollection.push({
      stockName: keyName, inputData: {}, resultData: {}
    });

    debugger;
  }
}
