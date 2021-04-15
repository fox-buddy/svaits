import { Component, OnInit } from '@angular/core';
import { IStock } from '../core/IStockData';
import { StockService } from '../core/stock.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.css']
})
export class StockSummaryComponent implements OnInit {

  public stockName: string;
  public stockIndex: number;
  public stockInWork: IStock;

  constructor(private route: ActivatedRoute, private _stockSrv: StockService, private location: Location) {
    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));
    this.stockInWork = this._stockSrv.stockCollection[this.stockIndex];
  }

  ngOnInit(): void {
  }

}
