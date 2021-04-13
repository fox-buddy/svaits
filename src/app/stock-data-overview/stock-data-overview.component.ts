import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-data-overview',
  templateUrl: './stock-data-overview.component.html',
  styleUrls: ['./stock-data-overview.component.css']
})
export class StockDataOverviewComponent implements OnInit {

  public stockName: string = '';
  public stockIndex: number;

  constructor(private route: ActivatedRoute) {
    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));

    debugger;
  }

  ngOnInit(): void {
  }

}
