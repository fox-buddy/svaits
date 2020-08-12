import { Injectable } from '@angular/core';
import { IStock, IStockResults, IStockInputs } from './IStockData'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stockCollection: IStock[] = [];
  private stockToCalculate: string;

  constructor() { }

  public addNewStockEntry(keyName: string) {
    this.stockCollection.push({
      stockName: keyName, inputData: this.inputDataEmpty(), resultData: this.resultDataEmpty()
    });


  }

  public set stockCalcState(stockName: string) {
    this.stockToCalculate = stockName;
  }

  public getIndexOfStockDataBy(stockName: string) {

  }

  private inputDataEmpty(): IStockInputs {
    return {
      bilanzSummeInMillionenZumStichtag: 0,
      bilanzSummeDescription: 'Eigenkapital + Fremdkapital zum letzten Bilanzstichtag',
      eigenKapitalInMillionenZumStichtag: 0,
      eigenKapitalDescription: 'gesamtes Eigenkapital zum letzten Bilanzstichtag',
      eigenKapitalThreeYearAverageInMillionen: 0,
      eigenKapitalThreeYearAverageDescription: 'gemitteltes Eigenkapital der letzten 3 Bilanzstichtage',
      gesamtVerbindlichKeitenInMillionenZumStichtag: 0,
      gesamtVerbindlichKeitenDescription: 'gesamtes Fremdkapital zum letzten Bilanzstichtag',
      zahlungsMittelInMillionenZumStichtag: 0,
      zahlungsMittelDescription: 'Summe der Zahlungsmittel zum letzten Bilanzstichtag',
      operativerCashflowInMillionenZumStichtag: 0,
      operativerCashflowDescription: 'operativer Cashflow zum letzten Bilanzstichtag',
      operativerCashflowThreeYearAverageInMillionen: 0,
      operativerCashflowThreeYearAverageDescription: 'gemittelter operativer Cashflow der letzten 3 Bilanzstichtage',
      investmentCashflowInMillionenZumStichtag: 0,
      investmentCashflowDescription: 'cashflow aus Investitionstätigkeit zum letzten Bilanzstichtag',
      investmentCashflowThreeYearAverageInMillionen: 0,
      investmentCashflowThreeYearAverageDescription: 'gemittelter cashflow aus Investitionstätigkeit der letzten 3 Bilanzstichtage',
      umsatzInMillionenZumStichtag: 0,
      umsatzInMillionenDescription: 'Umsatzergebnis zum letzten Bilanzstichtag',
      ebitInMillionenZumStichtag: 0,
      ebitDescription: 'Erlöse vor Steuern und Zinsen',
      eatInMillionenZumStichtag: 0,
      eatDescription: 'Erlöse nach Steuern. In Deutschland Jahresendergebnis',
      marktKapitalisierungInMillionenZumStichtag: 0,
      marktKapitalisierungDescription: 'Maktkapitalisierung. Gesamter Börsenwert',

      umsatzChangeFirstPeriod: 0,
      umsatzChangeSecondPeriod: 0,
      umsatzChangeThirdPeriod: 0,
      umsatzChangeFourthPeriod: 0,
      umsatzChangeFifthPeriod: 0,
      umsatzChangeSixthPeriod: 0,
      umsatzChangeDescription: 'Umsatzveränderungen der letzten 6 Jahre zum Stichtag im Vergleich zum Vorjahr',

      expectedRateOfReturnPercent: 0,
      expectedRateOfReturnDescription: 'Erwartete Rendite. Sollte mindestens 6 Prozent betragen (Immobiliendurchschnitt)',

      expectedLongGrowRatePercent: 0,
      expectedLongGrowRateDescription: 'Erwartetes Langzeitwachstum. Sollte konservativ gewählt werden, da die Zukunft schwer abschätzbar ist. Eine Rate im Bereich der Inflation beispielsweise (3)',

      securityMarginRate: 0,
      securityMarginDescription: 'Sicherheitsmarge zum Abwerten des errechneten Wertes. 5 bis 10 Prozent beispielsweise'
    }
  }

  private resultDataEmpty(): IStockResults {
    return {
      fairValue: 0, eigenkapitalquote: 0
    };
  }
}
