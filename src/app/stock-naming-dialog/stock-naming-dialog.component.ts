import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

export interface IDialogData {
  stockName: string;
}
@Component({
  selector: 'app-stock-naming-dialog',
  templateUrl: './stock-naming-dialog.component.html',
  styleUrls: ['./stock-naming-dialog.component.css']
})
export class StockNamingDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StockNamingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public stockNamingData: IDialogData
  ) { }

  ngOnInit(): void {
  }

  public abortNaming() {
    this.dialogRef.close();
  }
}
