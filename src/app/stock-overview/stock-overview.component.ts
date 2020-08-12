import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockNamingDialogComponent } from '../stock-naming-dialog/stock-naming-dialog.component';
import { Router } from '@angular/router';
import { StockService } from '../core/stock.service';

@Component({
  selector: 'app-stock-overview',
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.css']
})
export class StockOverviewComponent implements OnInit {

  constructor(private dialog: MatDialog, public _stockSrv: StockService, private router: Router) { }

  ngOnInit(): void {
  }

  public stockNamingDialogToNameNewStock() {
    const dialogRef = this.dialog.open(StockNamingDialogComponent, {
      maxWidth: "250px", data: {stockName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this._stockSrv.addNewStockEntry(result);
    })
  }

}
