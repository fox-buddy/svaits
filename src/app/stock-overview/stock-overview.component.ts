import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../stock-naming-dialog/stock-naming-dialog.component';

@Component({
  selector: 'app-stock-overview',
  templateUrl: './stock-overview.component.html',
  styleUrls: ['./stock-overview.component.css']
})
export class StockOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
