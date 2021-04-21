import { Component } from '@angular/core';
import { IStock } from './core/IStockData';
import { StockService } from './core/stock.service';
import { StoragehandlerService } from './core/storagehandler.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SVAITs';

  constructor(private _stockSrv: StockService, private _storageSrv: StoragehandlerService, private router: Router, private titleService: Title) {
    this.setTitle("SVAITs");
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public saveData() {
    if(this._stockSrv.stockCollection.length > 0) {
      this._storageSrv.saveToLocalStorage(this._stockSrv.stockCollection);
    }
  }

  public loadData() {
    let loadedData = this._storageSrv.loadFromLocalStorage();
    if(loadedData) {
      this._stockSrv.stockCollection = [...loadedData];
      this.router.navigateByUrl('/overview')
    }
  }
}
