import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../core/stock.service';
import { IStock, IDCFGrothRates } from '../core/IStockData';

import { StockCalculator } from '../core/stockCalclator';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-data-calculation',
  templateUrl: './stock-data-calculation.component.html',
  styleUrls: ['./stock-data-calculation.component.css']
})
export class StockDataCalculationComponent implements OnInit {

  public stockForm: FormGroup;
  public measuresHaveBeenCalculated: boolean = false;

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

  public openDetailview() {

  }

  public stockFormSubmit() {
    console.log(this.stockForm.value);
    this.formValuesToLocalObject();
    this.calculateBilanzResults();
    this.calculateCashFlowResuls();
    this.measuresHaveBeenCalculated = true;
    console.log(this.stockInWork);

  }

  private formValuesToLocalObject() {

    this.stockInWork.inputData = {
      ...this.stockForm.value
    };

    this.stockSrv.stockCollection[this.stockIndex].inputData = {
      ...this.stockInWork.inputData
    };

    console.log(this.stockInWork.inputData);
    console.log(this.stockSrv.stockCollection);
  }

  private calculateBilanzResults() {
    const inputData = this.stockInWork.inputData;

    this.stockInWork.resultData.eigenkapitalquote = StockCalculator.calculateEigenKapitalQuoteWith(
      inputData.eigenKapitalInMillionenZumStichtag, inputData.bilanzSummeInMillionenZumStichtag
    );

    this.stockInWork.resultData.gearing = StockCalculator.calculateGearintQuoteWith(
      inputData.gesamtVerbindlichKeitenInMillionenZumStichtag, inputData.zahlungsMittelInMillionenZumStichtag, inputData.eigenKapitalInMillionenZumStichtag
    );
    this.stockInWork.resultData.dynamischerVerschuldungsgrad = StockCalculator.calculateDynamischerVerschuldungsgrad(
      inputData.gesamtVerbindlichKeitenInMillionenZumStichtag, inputData.zahlungsMittelInMillionenZumStichtag
      , (inputData.operativerCashflowInMillionenZumStichtag - inputData.investmentCashflowInMillionenZumStichtag)
    );
    this.stockInWork.resultData.sachinvestitionsQuote = StockCalculator.calculateSachInvestitionsquote(
      inputData.investmentCashflowInMillionenZumStichtag, inputData.operativerCashflowInMillionenZumStichtag
    );
    this.stockInWork.resultData.eigenkapitalThreeYearAverageRendite = StockCalculator.calculateEigenkapitalRenditeWith(
      inputData.eatInMillionenZumStichtag, inputData.eigenKapitalThreeYearAverageInMillionen
    );
    this.stockInWork.resultData.ebitMarge = StockCalculator.calculateEbitMargeWith(
      inputData.ebitInMillionenZumStichtag, inputData.umsatzInMillionenZumStichtag
    );
    this.stockInWork.resultData.intrinsischeKaufdauer = StockCalculator.calculateIntrinsischeKaufdauerWith(
      inputData.marktKapitalisierungInMillionenZumStichtag
      , (inputData.operativerCashflowThreeYearAverageInMillionen - inputData.investmentCashflowThreeYearAverageInMillionen)
    );

    this.stockInWork.resultData.kursGewinnVerhaeltnisZumStichtag = StockCalculator.calculateKursGewinnVerhaeltnisWith(
      inputData.marktKapitalisierungInMillionenZumStichtag, inputData.eatInMillionenZumStichtag
    );
    this.stockInWork.resultData.einstandsrenditeZumStichtag = StockCalculator.calculateEinstandsRenditeWith(
      inputData.marktKapitalisierungInMillionenZumStichtag, inputData.eatInMillionenZumStichtag
    );


    const kursBuchWertRelation = StockCalculator.calculateKursBuchwertVerhaeltnisWith(
      inputData.marktKapitalisierungInMillionenZumStichtag, inputData.eigenKapitalInMillionenZumStichtag
    );
    this.stockInWork.resultData.kursBuchwertVerhaeltnisZumStichtag = kursBuchWertRelation;

    this.stockInWork.resultData.enterpriseValueZumStichtag = StockCalculator.calculateEnterpriseValueStichtagWith(
      kursBuchWertRelation, inputData.eigenKapitalInMillionenZumStichtag, inputData.gesamtVerbindlichKeitenInMillionenZumStichtag, inputData.zahlungsMittelInMillionenZumStichtag
    );

  }

  private calculateCashFlowResuls() {
    const inputData = this.stockInWork.inputData;


    const ratesOfGroth = [
      this.stockInWork.inputData.umsatzChangeFirstPeriod
      ,this.stockInWork.inputData.umsatzChangeSecondPeriod
      ,this.stockInWork.inputData.umsatzChangeThirdPeriod
      ,this.stockInWork.inputData.umsatzChangeFourthPeriod
      ,this.stockInWork.inputData.umsatzChangeFifthPeriod
      ,this.stockInWork.inputData.umsatzChangeSixthPeriod
    ]

    this.stockInWork.resultData.expectedRateOfGrothPercent = StockCalculator.calculateExpectedRateOfGroth(
      ratesOfGroth
    );

    const futureCompanyValue = StockCalculator.calculateFutureCompanyValueWithFutureCashFlow
      (
        inputData.operativerCashflowThreeYearAverageInMillionen - inputData.investmentCashflowThreeYearAverageInMillionen
        , {
          longGrothPercent: inputData.expectedLongGrowRatePercent
          , expectedRateOfGrowthPercent: this.stockInWork.resultData.expectedRateOfGrothPercent
          , expectedRateOfReturnPercent: inputData.expectedRateOfReturnPercent
        }
      );



    const fairStockValue = StockCalculator.calculateFairStockValue(
      futureCompanyValue
      , {liquideMittel: inputData.zahlungsMittelInMillionenZumStichtag, schulden: inputData.gesamtVerbindlichKeitenInMillionenZumStichtag}
      , inputData.anzahlAktien
    )

    this.stockInWork.resultData.fairValue = fairStockValue;
    this.stockInWork.resultData.fairValueWithSecurityMargin = fairStockValue * (1-(inputData.securityMarginRate/100));

    // calculateFutureCompanyValueWithFutureCashFlow --> Hält weitere Funktionen
  }

  // Tempalte Helpers
  public get numberOfLastYear() {
    let currentTime = new Date(Date.now());
    return currentTime.getFullYear() -1;
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
