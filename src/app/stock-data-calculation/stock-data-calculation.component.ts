import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
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
export class StockDataCalculationComponent implements OnInit, OnDestroy {

  public stockForm: FormGroup;
  public measuresHaveBeenCalculated: boolean = false;

  public manualGrowthInput: boolean = false;
  public showNetAssetValue: boolean = false;
  public showFutureDividendValue: boolean = true;

  private stockName: string;
  private stockIndex: number;
  private manualRateOfGrowthBuffer;
  public stockInWork: IStock
  public expectedRateOfGrothToShow: number;

  public bilanzKennZahlenOpened: boolean = true;
  public cashFlowRechnungOpened: boolean = true;
  public umsatzWachstumOpened: boolean = true;

  public showCurrencyDesc: boolean = false;
  public showTypeOfStockDesc: boolean = false;
  public showAnzahlAktienDesc: boolean = false;
  public showBilanzSummeDesc: boolean = false;
  public showEigenkapitalInMillionenDesc: boolean = false;
  public showEigenKapitalThreeYearAverageDescription:boolean = false;
  public showGesamtVerbindlichKeitenDescription:boolean = false;
  public showZahlungsMittelDescription:boolean = false;
  public showOperativerCashflowDescription:boolean = false;
  public showOperativerCashflowThreeYearAverageDescription:boolean = false;
  public showFundsFromOperationsDescription: boolean = false;
  public showInvestmentCashflowDescription:boolean = false;
  public showInvestmentCashflowThreeYearAverageDescription:boolean = false;
  public showUmsatzInMillionenDescription:boolean = false;
  public showEbitDescription:boolean = false;
  public showEatDescription:boolean = false;
  public showMarktKapitalisierungDescription:boolean = false;
  public showExpectedRateOfGrothPercentDescription:boolean = false;
  public showExpectedRateOfReturnDescription:boolean = false;
  public showExpectedLongGrowRateDescription:boolean = false;
  public showSecurityMarginDescription:boolean = false;
  public showDividendDescription: boolean = false;
  public showeigenkapitalquoteDescription:boolean = false;
  public showgearingdescription:boolean = false;
  public showdynamischerVerschuldungsgradDescription:boolean = false;
  public showsachinvestitionsQuoteDescription:boolean = false;
  public showeigenkapitalThreeYearAverageRenditeDescription:boolean = false;
  public showebitMargeDescription:boolean = false;
  public showintrinsischeKaufdauerDescription:boolean = false;
  public showkursGewinnVerhaeltnisZumStichtagDescription:boolean = false;
  public showeinstandsrenditeZumStichtagDescription:boolean = false;
  public showkursBuchwertVerhaeltnisZumStichtagDescription:boolean = false;
  public showenterpriseValueZumStichtagDescription:boolean = false;


  constructor(private route: ActivatedRoute, public stockSrv: StockService, private fb: FormBuilder, private location: Location) {

    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));

  }

  ngOnInit(): void {
    this.initForm();

    this.getStockDataFromService(this.stockIndex);
    this.assignStockValueToForm();

    if(this.stockInWork.resultData.fairValue > 0) {
      this.measuresHaveBeenCalculated =  true;
      this.umsatzWachstumOpened = false;
      this.cashFlowRechnungOpened = false;
      this.bilanzKennZahlenOpened = false;
    }

  }

  ngOnDestroy() {
    this.formValuesToLocalObject();
  }

  public navigateBack() {
    this.location.back();
  }

  public refreshCurrency(newVal) {
    this.stockInWork.inputData.currencyCode = newVal;
  }

  public refreshTypeOfGrowthCalculation(manual: boolean) {
    this.manualGrowthInput = manual;
    this.stockForm.patchValue({manualGrowth: manual});
    this.stockInWork.inputData.manualGrowth = manual;
  }

  public refreshTypeOfStock(typeId: number) {
    if(typeId == 1) {
      this.stockInWork.inputData.expectedLongGrowRatePercent = 3;
      this.stockInWork.inputData.expectedRateOfGrothPercent =  0;
      this.stockInWork.inputData.expectedRateOfReturnPercent = 8;
      this.stockInWork.inputData.securityMarginRate = 10;

      this.setFormValuesDueToTypeOfStockChange();

      // this.showNetAssetValue = false;
      this.refreshTypeOfGrowthCalculation(false);
    } else {
      this.resetInvestmentCashflowForReit();

      this.stockInWork.inputData.expectedLongGrowRatePercent = 3;
      this.stockInWork.inputData.expectedRateOfGrothPercent = 1;
      this.stockInWork.inputData.expectedRateOfReturnPercent = 6;
      this.stockInWork.inputData.securityMarginRate = 5;

      this.setFormValuesDueToTypeOfStockChange();

      // this.showNetAssetValue = true;
      this.refreshTypeOfGrowthCalculation(true);
    }
  }

  private setFormValuesDueToTypeOfStockChange() {
    this.stockForm.patchValue({
      expectedRateOfGrothPercent: this.stockInWork.inputData.expectedRateOfGrothPercent
    , expectedRateOfReturnPercent: this.stockInWork.inputData.expectedRateOfReturnPercent
    , expectedLongGrowRatePercent: this.stockInWork.inputData.expectedLongGrowRatePercent
    , securityMarginRate: this.stockInWork.inputData.securityMarginRate
    });
  }

  public resetInvestmentCashflowForReit() {
    this.stockInWork.inputData.investmentCashflowInMillionenZumStichtag = 0;
    this.stockInWork.inputData.investmentCashflowForDcf = 0;
  }

  public calculateExpectedRatesOfGrothToShowValue() {
    const ratesOfGroth = [
      this.stockForm.get('umsatzChangeFirstPeriod').value,
      this.stockForm.get('umsatzChangeSecondPeriod').value,
      this.stockForm.get('umsatzChangeThirdPeriod').value,
      this.stockForm.get('umsatzChangeFourthPeriod').value,
      this.stockForm.get('umsatzChangeFifthPeriod').value,
      this.stockForm.get('umsatzChangeSixthPeriod').value
    ]

    this.expectedRateOfGrothToShow = StockCalculator.calculateExpectedRateOfGroth(ratesOfGroth);
  }

  public stockFormSubmit() {

    this.cashFlowRechnungOpened = false;
    this.umsatzWachstumOpened = false;
    this.bilanzKennZahlenOpened = false;

    this.formValuesToLocalObject();
    this.calculateBilanzResults();
    if(this.stockInWork.inputData.expectedRateOfGrothPercent) {
      this.calculateCashFlowResuls(true);
    } else {
      this.calculateCashFlowResuls(false);
    }

    this.calculateFairDividentResults();

    this.measuresHaveBeenCalculated = true;
  }

  private formValuesToLocalObject() {

    this.stockInWork.inputData.anzahlAktien = this.stockForm.get('anzahlAktien').value;
    this.stockInWork.inputData.currencyCode = this.stockForm.get('currencyCode').value;
    this.stockInWork.inputData.typeOfStock = this.stockForm.get('typeOfStock').value;
    this.stockInWork.inputData.bilanzSummeInMillionenZumStichtag = this.stockForm.get('bilanzSummeInMillionenZumStichtag').value;
    this.stockInWork.inputData.eigenKapitalInMillionenZumStichtag = this.stockForm.get('eigenKapitalInMillionenZumStichtag').value;
    this.stockInWork.inputData.eigenKapitalThreeYearAverageInMillionen = this.stockForm.get('eigenKapitalThreeYearAverageInMillionen').value;
    this.stockInWork.inputData.gesamtVerbindlichKeitenInMillionenZumStichtag = this.stockForm.get('gesamtVerbindlichKeitenInMillionenZumStichtag').value;
    this.stockInWork.inputData.zahlungsMittelInMillionenZumStichtag = this.stockForm.get('zahlungsMittelInMillionenZumStichtag').value;
    this.stockInWork.inputData.operativerCashflowInMillionenZumStichtag = this.stockForm.get('operativerCashflowInMillionenZumStichtag').value;
    this.stockInWork.inputData.operativerCashflowForDcf = this.stockForm.get('operativerCashflowInMillionenZumStichtag').value;
    this.stockInWork.inputData.investmentCashflowInMillionenZumStichtag = this.stockForm.get('investmentCashflowInMillionenZumStichtag').value;
    this.stockInWork.inputData.investmentCashflowForDcf = this.stockForm.get('investmentCashflowInMillionenZumStichtag').value;
    this.stockInWork.inputData.umsatzInMillionenZumStichtag = this.stockForm.get('umsatzInMillionenZumStichtag').value;
    this.stockInWork.inputData.ebitInMillionenZumStichtag = this.stockForm.get('ebitInMillionenZumStichtag').value;
    this.stockInWork.inputData.eatInMillionenZumStichtag = this.stockForm.get('eatInMillionenZumStichtag').value;
    this.stockInWork.inputData.marktKapitalisierungInMillionenZumStichtag = this.stockForm.get('marktKapitalisierungInMillionenZumStichtag').value;
    this.stockInWork.inputData.umsatzChangeFirstPeriod = this.stockForm.get('umsatzChangeFirstPeriod').value;
    this.stockInWork.inputData.umsatzChangeSecondPeriod = this.stockForm.get('umsatzChangeSecondPeriod').value;
    this.stockInWork.inputData.umsatzChangeThirdPeriod = this.stockForm.get('umsatzChangeThirdPeriod').value;
    this.stockInWork.inputData.umsatzChangeFourthPeriod = this.stockForm.get('umsatzChangeFourthPeriod').value;
    this.stockInWork.inputData.umsatzChangeFifthPeriod = this.stockForm.get('umsatzChangeFifthPeriod').value;
    this.stockInWork.inputData.umsatzChangeSixthPeriod = this.stockForm.get('umsatzChangeSixthPeriod').value;
    this.stockInWork.inputData.expectedRateOfGrothPercent = this.stockForm.get('expectedRateOfGrothPercent').value;
    this.stockInWork.inputData.expectedRateOfReturnPercent = this.stockForm.get('expectedRateOfReturnPercent').value;
    this.stockInWork.inputData.expectedLongGrowRatePercent = this.stockForm.get('expectedLongGrowRatePercent').value;
    this.stockInWork.inputData.securityMarginRate = this.stockForm.get('securityMarginRate').value;
    this.stockInWork.inputData.dividendPerYearPercent = this.stockForm.get('dividendPerYearPercent').value;
    this.stockInWork.inputData.manualGrowth = this.stockForm.get('manualGrowth').value;

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
      , (inputData.operativerCashflowInMillionenZumStichtag - inputData.investmentCashflowInMillionenZumStichtag)
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

    this.stockInWork.resultData.navPerStock = StockCalculator.calculateNetAssetValueWith(
      inputData.eigenKapitalInMillionenZumStichtag, inputData.marktKapitalisierungInMillionenZumStichtag
    );

    this.stockInWork.resultData.kursBuchwertVerhaeltnisZumStichtag = kursBuchWertRelation;

    this.stockInWork.resultData.enterpriseValueZumStichtag = StockCalculator.calculateEnterpriseValueStichtagWith(
      kursBuchWertRelation, inputData.eigenKapitalInMillionenZumStichtag, inputData.gesamtVerbindlichKeitenInMillionenZumStichtag, inputData.zahlungsMittelInMillionenZumStichtag
    );

  }

  private calculateCashFlowResuls(calculateWithExpectedRate: boolean) {
    const inputData = this.stockInWork.inputData;


    const ratesOfGroth = [
      this.stockInWork.inputData.umsatzChangeFirstPeriod
      ,this.stockInWork.inputData.umsatzChangeSecondPeriod
      ,this.stockInWork.inputData.umsatzChangeThirdPeriod
      ,this.stockInWork.inputData.umsatzChangeFourthPeriod
      ,this.stockInWork.inputData.umsatzChangeFifthPeriod
      ,this.stockInWork.inputData.umsatzChangeSixthPeriod
    ]


    this.stockInWork.resultData.expectedRateOfGrothPercent = (calculateWithExpectedRate) ? inputData.expectedRateOfGrothPercent : StockCalculator.calculateExpectedRateOfGroth(
      ratesOfGroth
    );

    const futureCompanyValue = StockCalculator.calculateFutureCompanyValueWithFutureCashFlow
      (
        inputData.operativerCashflowForDcf - inputData.investmentCashflowForDcf
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
    this.stockInWork.resultData.fairValueWithSecurityMargin = Number((fairStockValue * (1-(inputData.securityMarginRate/100))).toFixed(2));

    // calculateFutureCompanyValueWithFutureCashFlow --> Hält weitere Funktionen
  }

  private calculateFairDividentResults() {
    this.stockInWork.resultData.healthyDividend = StockCalculator.calculateDividend(
      this.stockInWork.resultData.fairValue, this.stockInWork.inputData.dividendPerYearPercent
    );
  }

  // Tempalte Helpers
  public get numberOfLastYear() {
    let currentTime = new Date(Date.now());
    return currentTime.getFullYear() -1;
  }

  public clearStockForm() {
    this.stockForm.patchValue({
      anzahlAktien: 0
      , currencyCode: '€'
      , typeOfStock: 1
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
      , dividendPerYearPercent: 0
      , manualGrowth: false

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

  private assignStockValueToForm() {
    this.stockForm.patchValue({
      anzahlAktien: this.stockInWork.inputData.anzahlAktien
      , currencyCode: this.stockInWork.inputData.currencyCode
      , typeOfStock: this.stockInWork.inputData.typeOfStock
      , bilanzSummeInMillionenZumStichtag: this.stockInWork.inputData.bilanzSummeInMillionenZumStichtag
      , eigenKapitalInMillionenZumStichtag: this.stockInWork.inputData.eigenKapitalInMillionenZumStichtag
      , eigenKapitalThreeYearAverageInMillionen: this.stockInWork.inputData.eigenKapitalThreeYearAverageInMillionen
      , gesamtVerbindlichKeitenInMillionenZumStichtag: this.stockInWork.inputData.gesamtVerbindlichKeitenInMillionenZumStichtag
      , zahlungsMittelInMillionenZumStichtag: this.stockInWork.inputData.zahlungsMittelInMillionenZumStichtag
      , operativerCashflowInMillionenZumStichtag: this.stockInWork.inputData.operativerCashflowInMillionenZumStichtag
      , investmentCashflowInMillionenZumStichtag: this.stockInWork.inputData.investmentCashflowInMillionenZumStichtag
      , umsatzInMillionenZumStichtag: this.stockInWork.inputData.umsatzInMillionenZumStichtag
      , ebitInMillionenZumStichtag: this.stockInWork.inputData.ebitInMillionenZumStichtag
      , eatInMillionenZumStichtag: this.stockInWork.inputData.eatInMillionenZumStichtag
      , marktKapitalisierungInMillionenZumStichtag: this.stockInWork.inputData.marktKapitalisierungInMillionenZumStichtag
      , dividendPerYearPercent: this.stockInWork.inputData.dividendPerYearPercent
      , manualGrowth: this.stockInWork.inputData.manualGrowth

      , umsatzChangeFirstPeriod: this.stockInWork.inputData.umsatzChangeFirstPeriod
      , umsatzChangeSecondPeriod: this.stockInWork.inputData.umsatzChangeSecondPeriod
      , umsatzChangeThirdPeriod: this.stockInWork.inputData.umsatzChangeThirdPeriod
      , umsatzChangeFourthPeriod: this.stockInWork.inputData.umsatzChangeFourthPeriod
      , umsatzChangeFifthPeriod: this.stockInWork.inputData.umsatzChangeFifthPeriod
      , umsatzChangeSixthPeriod: this.stockInWork.inputData.umsatzChangeSixthPeriod

      , expectedRateOfGrothPercent: this.stockInWork.inputData.expectedRateOfGrothPercent
      , expectedRateOfReturnPercent: this.stockInWork.inputData.expectedRateOfReturnPercent
      , expectedLongGrowRatePercent: this.stockInWork.inputData.expectedLongGrowRatePercent
      , securityMarginRate: this.stockInWork.inputData.securityMarginRate
    });
  }

  private initForm() {
    if(this.stockForm) {
      return;
    }

    this.stockForm = this.fb.group({
      anzahlAktien: [0, Validators.required]
      , currencyCode: ['', Validators.required]
      , typeOfStock: [1, Validators.required]
      , bilanzSummeInMillionenZumStichtag: [0, Validators.required]
      , eigenKapitalInMillionenZumStichtag: [0, Validators.required]
      , eigenKapitalThreeYearAverageInMillionen: [0, Validators.required]
      , gesamtVerbindlichKeitenInMillionenZumStichtag: [0, Validators.required]
      , zahlungsMittelInMillionenZumStichtag: [0, Validators.required]
      , operativerCashflowInMillionenZumStichtag: [0, Validators.required]
      , investmentCashflowInMillionenZumStichtag: [0, Validators.required]
      , umsatzInMillionenZumStichtag: [0, Validators.required]
      , ebitInMillionenZumStichtag: [0, Validators.required]
      , eatInMillionenZumStichtag: [0, Validators.required]
      , marktKapitalisierungInMillionenZumStichtag: [0, Validators.required]
      , dividendPerYearPercent: [0, Validators.required]
      , manualGrowth: [false, Validators.required]

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
    this.stockInWork = this.stockSrv.stockCollection[stockIndex]

  }
}
