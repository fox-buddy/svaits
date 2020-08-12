import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../core/stock.service';

@Component({
  selector: 'app-stock-data-calculation',
  templateUrl: './stock-data-calculation.component.html',
  styleUrls: ['./stock-data-calculation.component.css']
})
export class StockDataCalculationComponent implements OnInit {

  private stockName: string;
  private stockIndex: Number;

  constructor(private route: ActivatedRoute, private stockSrv: StockService) {

    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));
    console.log(this.stockName);
    console.log(this.stockIndex);
  }

  ngOnInit(): void {
  }

}
