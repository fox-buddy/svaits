import { Injectable } from '@angular/core';
import { IStock, IStockResults, IStockInputs } from './IStockData'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public stockCollection: IStock[] = [];
  private stockToCalculate: string;
  public stockToViewDetailled: number;

  public typesOfStock = [
    {id: 1, typeName: 'Aktie'}
    , {id: 2, typeName: 'REIT'}
  ]

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

      typeOfStock: 1,
      typeOfStockDescription: 'Die Art der Aktie. Die Kennzahlen zur Berechnung des fairen Wertes weichen voneinander ab. Bsp Reit: Realty Income, Bsp Aktie: Microsoft',

      currencyCode: '€',
      currencyCodeDescription: 'Die für die Berechnung verwendete Währungseinheit. Beispiel EUR oder USD',

      anzahlAktien: 0,
      anzahlAktienDescription: 'Die gesamte Anzahl der gehandelten Aktien',

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
      operativerCashflowDescription: 'operativer Cashflow zum letzten Bilanzstichtag, oder theoretischer aus einer Schätzung in der Zukunft',
      operativerCashflowForDcf: 0,
      operativerCashflowForDcfDescription: 'der zur Berechnung des fairen Wertes verwendete operative Cashflow',
      investmentCashflowInMillionenZumStichtag: 0,
      investmentCashflowDescription: 'cashflow aus Investitionstätigkeit zum letzten Bilanzstichtag, oder theoretischer aus einer Schätzung in der Zukunft',
      investmentCashflowForDcf: 0,
      investmentCashflowForDcfDescription: 'der zur Berechnung des fairen Wertes verwendete investment Cashflow',
      fundsFromOperationsDescription: 'Cashflow aus der operativen Tätigkeit eines Immobilienunternehmens (Nettogewinn + Abschreibungen + Amortisation - Veräußerungen)',
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
      umsatzChangeDescription: 'Umsatzveränderungen der letzten 6 Jahre zum Stichtag im Vergleich zum Vorjahr. Dient zur Berechnung des zukünftigen Wachstums',

      expectedRateOfReturnPercent: 0,
      expectedRateOfReturnDescription: 'Erwartete Rendite. Sollte mindestens 6 Prozent betragen (Immobiliendurchschnitt)',

      expectedLongGrowRatePercent: 0,
      expectedLongGrowRateDescription: 'Erwartetes Langzeitwachstum. Sollte konservativ gewählt werden, da die Zukunft schwer abschätzbar ist. Eine Rate im Bereich der Inflation beispielsweise (3)',

      securityMarginRate: 0,
      securityMarginDescription: 'Sicherheitsmarge zum Abwerten des errechneten Wertes. 5 bis 10 Prozent beispielsweise',

      expectedRateOfGrothPercent: 0,
      expectedRateOfGrothPercentDescription: 'Erwartetes Wachstum. Kann sich am durchschnittlich errechneten Orientieren'
    }
  }

  private resultDataEmpty(): IStockResults {
    return {
      eigenkapitalquote: 0,
      eigenkapitalquoteDescription: 'Hier spielt Krisenfestigkeit eine große Rolle. Alles über 50 Prozent ist als äußerst gut zu bewerten',

      gearing: 0,
      gearingdescription: `
      Zeigt die welchen Anteil Schulden abzüglich liquiden Mitteln am Eigenkapital decken.
      Besorgniserregend ab 70%, da die Verbindlichkeiten einen zu hohen Teil des Eigenkapitals decken. Sehr gut bis 20 Prozent. Gut bis 50 %`,

      dynamischerVerschuldungsgrad: 0,
      dynamischerVerschuldungsgradDescription: `Theoretische Tilgungsdauer der Schulden aus dem Free Cash-Flow in Jahren.
      Ab 5 als kritisch zu betrachten. Zahlungsfluss genauer unter die Lupe nehmen (möglicher Übernahmekandidat).`,

      sachinvestitionsQuote: 0,
      sachinvestitionsQuoteDescription: `Gibt an welcher Anteil des operativen Cash Flows für Sachinvestitionen ausgegeben werden muss um im Geschäft zu bleiben.
      Hohe Quoten sind in Kapitalintensiven Branchen keine Seltenheit. Je geringer desto besser.`,

      eigenkapitalThreeYearAverageRendite: 0,
      eigenkapitalThreeYearAverageRenditeDescription: 'Verzinsung des Eigenkapitals, was man als Anleger einbringt. Zwischen 10 und 15 Prozent deuten auf ein gesundes und effizientes Unternehmen hin. ',

      ebitMarge: 0,
      ebitMargeDescription: `Ähnlich zu Umsatzrendite. Welcher Anteil des Umsatzes ergibt einen Gewinn? Jedoch gibt der Ebit den Abschluss vor Steuern an. Macht also den internationalen Vergleich einfacher`,

      intrinsischeKaufdauer: 0,
      intrinsischeKaufdauerDescription: `Zeitspanne in Jahren, die das Unternehmen benötigt, um sich selbst aus dem Free Cash Flow zu kaufen (Ohne Wachstum)`,

      kursGewinnVerhaeltnisZumStichtag: 0,
      kursGewinnVerhaeltnisZumStichtagDescription: `Das Verhältnis von Marktkapitalisierung zu Jahresüberschuss. Je niedriger je besser.
      In Relation zu setzen ist das Wachstum. Je schneller das Unternehmen wächst je schneller armotisiert sich die Investition. Durchschnitt liegt bei 15 bis 16`,

      einstandsrenditeZumStichtag: 0,
      einstandsrenditeZumStichtagDescription: 'Durschnitt liegt bei 6 bis 7 Prozent. Beschreibt die Verzinsung der Investition im ersten Jahr bei stabilem Geschäftsbetrieb. ',

      kursBuchwertVerhaeltnisZumStichtag: 0,
      kursBuchwertVerhaeltnisZumStichtagDescription: `Gibt an, welchen Aufschlag der Markt auf das Reinvermögen des Unternehmens zahlt. Der Markt macht dies von der Zukunft des Unternehmens abhängig.
      Steht in engem Verhältnis zur Eigenkapitalrendite. Je höher je besser`,

      enterpriseValueZumStichtag: 0,
      enterpriseValueZumStichtagDescription: 'Entspricht dem echten Marktwert des Unternehmens. In Mio €. Im Idealfall höher als die Marktkapitalisierung',

      expectedRateOfGrothPercent: 0,
      expectedRateOfGrothPercentDescription: 'Durchschnittliches Wachstum. Errechneter Wert',

      sumOfDiscountedCashFlows: 0,
      endValue: 0,
      nettoCash: 0,

      fairValue: 0,
      fairValueWithSecurityMargin: 0,
      fairValueDescription: 'Fairer (innerer) Wert je Aktie nach der einfachsten Discounted Cashflow Analyse (kontinuierliches Wachstum über 10 Jahre).',
    };
  }
}
