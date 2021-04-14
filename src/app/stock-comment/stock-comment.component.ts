import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStock } from '../core/IStockData';
import { StockService } from '../core/stock.service';

@Component({
  selector: 'app-stock-comment',
  templateUrl: './stock-comment.component.html',
  styleUrls: ['./stock-comment.component.css']
})
export class StockCommentComponent implements OnInit {

  public stockName: string;
  public stockIndex: number;
  public stockInWork: IStock;

  constructor(private route: ActivatedRoute, private _stockSrv: StockService) {
    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));

  }

  ngOnInit(): void {
  }

}
