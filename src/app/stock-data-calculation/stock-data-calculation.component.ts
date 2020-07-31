import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-data-calculation',
  templateUrl: './stock-data-calculation.component.html',
  styleUrls: ['./stock-data-calculation.component.css']
})
export class StockDataCalculationComponent implements OnInit {

  @Input() stockKeyString: string;

  constructor() { }

  ngOnInit(): void {
  }

}
