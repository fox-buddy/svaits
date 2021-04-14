import { Injectable } from '@angular/core';
import { IStock } from './IStockData'

@Injectable({
  providedIn: 'root'
})
export class StoragehandlerService {

  constructor() { }

  public saveToLocalStorage(stockData: IStock[]) {

    localStorage.setItem('stockCollection', JSON.stringify(stockData));
  }

  public loadFromLocalStorage(): IStock[]|false {
    let data: IStock[] = JSON.parse(localStorage.getItem("stockCollection"));

    if(data) {
      return data;
    } else {
      return false;
    }
  }
}
