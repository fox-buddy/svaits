import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../core/stock.service';
import { IStock } from '../core/IStockData';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-data-calculation',
  templateUrl: './stock-data-calculation.component.html',
  styleUrls: ['./stock-data-calculation.component.css']
})
export class StockDataCalculationComponent implements OnInit {

  public stockForm: FormGroup;

  private stockName: string;
  private stockIndex: number;
  public stockInWork: IStock

  constructor(private route: ActivatedRoute, private stockSrv: StockService, private fb: FormBuilder) {

    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));
    console.log(this.stockName);
    console.log(this.stockIndex);
  }

  ngOnInit(): void {
    this.initForm();
    this.getStockDataFromService(this.stockIndex);
  }

  public stockFormSubmit() {
    console.log(this.stockForm.value);
  }

  public clearStockForm() {
    this.stockForm.patchValue({
      anzahlAktien: 0
      , bilanzSummeInMillionenZumStichtag: 0
      , eigenKapitalInMillionenZumStichtag: 0
      , eigenKapitalThreeYearAverageInMillionen: 0
      , gesamtVerbindlichKeitenInMillionenZumStichtag: 0
      , zahlungsMittelInMillionenZumStichtag: 0
      , operativerCashflowInMillionenZumStichtag: 0
      , operativerCashflowThreeYearAverageInMillionen: 0
      , investmentCashflowInMillionenZumStichtag: 0
      , investmentCashflowThreeYearAverageInMillionen: 0
      , umsatzInMillionenZumStichtag: 0
      , ebitInMillionenZumStichtag: 0
      , eatInMillionenZumStichtag: 0
      , marktKapitalisierungInMillionenZumStichtag: 0


      , umsatzChangeFirstPeriod: 0
      , umsatzChangeSecondPeriod: 0
      , umsatzChangeThirdPeriod: 0
      , umsatzChangeFourthPeriod: 0
      , umsatzChangeFifthPeriod: 0
      , umsatzChangeSixthPeriod: 0

      , expectedRateOfGrothPercent: 0
      , expectedRateOfReturnPercent: 0
      , expectedLongGrowRatePercent: 0
      , securityMarginRate: 0
    });
  }

  private initForm() {
    if(this.stockForm) {
      return;
    }

    this.stockForm = this.fb.group({
      anzahlAktien: [0, Validators.required]
      , bilanzSummeInMillionenZumStichtag: [0, Validators.required]
      , eigenKapitalInMillionenZumStichtag: [0, Validators.required]
      , eigenKapitalThreeYearAverageInMillionen: [0, Validators.required]
      , gesamtVerbindlichKeitenInMillionenZumStichtag: [0, Validators.required]
      , zahlungsMittelInMillionenZumStichtag: [0, Validators.required]
      , operativerCashflowInMillionenZumStichtag: [0, Validators.required]
      , operativerCashflowThreeYearAverageInMillionen: [0, Validators.required]
      , investmentCashflowInMillionenZumStichtag: [0, Validators.required]
      , investmentCashflowThreeYearAverageInMillionen: [0, Validators.required]
      , umsatzInMillionenZumStichtag: [0, Validators.required]
      , ebitInMillionenZumStichtag: [0, Validators.required]
      , eatInMillionenZumStichtag: [0, Validators.required]
      , marktKapitalisierungInMillionenZumStichtag: [0, Validators.required]


      , umsatzChangeFirstPeriod: [0, Validators.required]
      , umsatzChangeSecondPeriod: [0, Validators.required]
      , umsatzChangeThirdPeriod: [0, Validators.required]
      , umsatzChangeFourthPeriod: [0, Validators.required]
      , umsatzChangeFifthPeriod: [0, Validators.required]
      , umsatzChangeSixthPeriod: [0, Validators.required]

      , expectedRateOfGrothPercent: [0, Validators.required]
      , expectedRateOfReturnPercent: [0, Validators.required]
      , expectedLongGrowRatePercent: [0, Validators.required]
      , securityMarginRate: [0, Validators.required]
    })
  }

  private getStockDataFromService(stockIndex: number) {
    this.stockInWork = {
      ...this.stockSrv.stockCollection[stockIndex]
    }
  }
}
