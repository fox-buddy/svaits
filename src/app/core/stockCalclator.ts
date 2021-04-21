import { IDCFGrothRates, ILiquidsAndInterests } from '../core/IStockData';

export class StockCalculator {
  static calculateEigenKapitalQuoteWith(eigenkapital: number, bilanzSumme: number) {
    if(bilanzSumme === 0) {
      return 0;
    }

    return Number(((eigenkapital/bilanzSumme) * 100).toFixed(2));
  }

  static calculateNetAssetValueWith(eigenkapital: number, anzahlAktien: number) {
    if(anzahlAktien === 0) {
      return 0;
    }

    return Number((eigenkapital/anzahlAktien).toFixed(2));
  }

  static calculateDividend(stockPrice: number, dividendRateInPercent: number) {
    let dividendRatio = dividendRateInPercent/100;

    if(dividendRateInPercent === 0) {
      return 0;
    }

    return Number((stockPrice*dividendRatio).toFixed(2));
  }

  static stockPrice(marketCap: number, stockCount: number) {
    if(stockCount === 0) {
      return 0;
    }

    return Number((marketCap/stockCount).toFixed(2));
  }

  static calculateGearintQuoteWith(gesamtVerbindlichkeiten: number, liquideMittel: number, eigenkapital: number) {
    if(eigenkapital === 0) {
      return 0;
    }

    return Number((((gesamtVerbindlichkeiten - liquideMittel)/eigenkapital) * 100).toFixed(2));
  }

  static calculateDynamischerVerschuldungsgrad(
    gesamtVerbindlichkeiten: number
    , liquideMittel: number
    , freeCashFlowStichtag: number
  ) {
    if(freeCashFlowStichtag === 0) {
      return 0;
    }

    return Number(((gesamtVerbindlichkeiten - liquideMittel)/freeCashFlowStichtag).toFixed(2));
  }

  static calculateSachInvestitionsquote(
    cashFlowInvestMent: number
    , operativerCashFlow: number
  ) {
    if(operativerCashFlow === 0) {
      return 0;
    }

    return Number(((cashFlowInvestMent/operativerCashFlow) * 100).toFixed(2));
  }

  static calculateEigenkapitalRenditeWith(
    earningsAfterTaxStichtag: number
    , threeYearAverageEigenkapital: number
  ) {
    if(threeYearAverageEigenkapital === 0) {
      return 0;
    }

    return Number(((earningsAfterTaxStichtag/threeYearAverageEigenkapital) * 100).toFixed(2));
  }

  static calculateEbitMargeWith(
    earningsBeforeInterestsAndTaxStichtag: number
    , umsatzerloeseStichtag: number
  ) {
    if(umsatzerloeseStichtag === 0) {
      return 0;
    }

    return Number(((earningsBeforeInterestsAndTaxStichtag/umsatzerloeseStichtag) * 100).toFixed(2));
  }

  static calculateIntrinsischeKaufdauerWith(
    marktKapitalisierungStichtag: number
    , freeCashFlowThreeYearAverage: number
  ) {
    if(freeCashFlowThreeYearAverage === 0) {
      return 0;
    }

    return Number((marktKapitalisierungStichtag / freeCashFlowThreeYearAverage).toFixed(1));
  }

  static calculateKursGewinnVerhaeltnisWith(
    marktKapitalisierungStichtag: number
    , earningsAfterTaxStichtag: number
  ) {
    if(earningsAfterTaxStichtag === 0) {
      return 0;
    }

    return Number((marktKapitalisierungStichtag / earningsAfterTaxStichtag).toFixed(2));
  }

  static calculateEinstandsRenditeWith(
    marktKapitalisierungStichtag: number
    , earningsAfterTaxStichtag: number
  ) {
    if(marktKapitalisierungStichtag === 0) {
      return 0;
    }

    return Number(((earningsAfterTaxStichtag / marktKapitalisierungStichtag) * 100).toFixed(2));
  }

  static calculateKursBuchwertVerhaeltnisWith(
    marktKapitalisierungStichtag: number
    , eigenkapital: number
  ) {
    if(eigenkapital === 0) {
      return 0;
    }

    return Number((marktKapitalisierungStichtag/eigenkapital).toFixed(2));
  }

  static calculateEnterpriseValueStichtagWith(
    buchwertRelation: number
    , eigenkapital: number
    , gesamtVerbindlichkeiten: number
    , zahlungsmittel: number
  ) {
    return Number(((eigenkapital + gesamtVerbindlichkeiten - zahlungsmittel) * buchwertRelation).toFixed(2));
  }

  static calculateExpectedRateOfGroth(
    ratesOfGroth: number[]
  ) {

    if(ratesOfGroth.length === 0) {
      return 0;
    }

    let sumOfGroth = 0;

    ratesOfGroth.forEach((rate) => {
      sumOfGroth += rate;
    });

    return Number((sumOfGroth/ratesOfGroth.length).toFixed(2));
  }

  static calculateFairStockValue(discountedCFCompanyValue: number, liquidsAndInterests: ILiquidsAndInterests, anzahlAktien: number) {

    let companyValue = (discountedCFCompanyValue + (liquidsAndInterests.liquideMittel - liquidsAndInterests.schulden)) * 1000000;


    const valuePerStock = (anzahlAktien === 0) ? 0 : companyValue / anzahlAktien;



    return Number(valuePerStock.toFixed(2));
  }

  static calculateFutureCompanyValueWithFutureCashFlow(freeCashFlowThreeYearAverageInMillionen: number
      , growthRates: IDCFGrothRates
    ) {


    const rateOfGrothFactor = 1+(growthRates.expectedRateOfGrowthPercent/100);
    const rateOfReturnFactor = 1+(growthRates.expectedRateOfReturnPercent/100);
    let valueThatGrows = freeCashFlowThreeYearAverageInMillionen;

    let cashFlowArray: number[] = [];
    let discountFactorArray: number[] = [];

    for(let i=1; i<=10;i++) {
      const calculatedCashFlow = valueThatGrows*rateOfGrothFactor;
      const discountFactor = Math.pow(rateOfReturnFactor, i);

      discountFactorArray.push(discountFactor);
      cashFlowArray.push(calculatedCashFlow);
      valueThatGrows = calculatedCashFlow;
    }


    const cashFlowSumAndLastValue = this.calculateDiscountedCashFlows(cashFlowArray, discountFactorArray);
    const restwert = this.calculateDiscountedCashFlowRestwert(cashFlowSumAndLastValue.lastValue, growthRates.longGrothPercent, growthRates.expectedRateOfReturnPercent )

    return cashFlowSumAndLastValue.companySum + restwert;
  }

  static calculateDiscountedCashFlows(futureCashFlowArray: number[], discountFactorArray: number[]) {
    if(futureCashFlowArray.length != discountFactorArray.length) {
      return {companySum: 0, lastValue: 0};
    }

    let discountedCashFlows: number[] = [];

    for(let i=0; i<futureCashFlowArray.length; i++) {
      discountedCashFlows.push(futureCashFlowArray[i]/discountFactorArray[i]);
    }

    let discountedCashFlowSum: number = 0;

    discountedCashFlows.forEach((element) => {
      discountedCashFlowSum += element;
    })

    if(discountedCashFlowSum == NaN) {
      discountedCashFlowSum = 0;
    }

    return {companySum: discountedCashFlowSum, lastValue: discountedCashFlows[futureCashFlowArray.length-1]};
  }

  static calculateDiscountedCashFlowRestwert(discountedCashFlowInTenthYear: number,longGrothPercent:number, expectedRateOfReturnPercent: number) {
    const discountFactor = (expectedRateOfReturnPercent- longGrothPercent) / 100;
    const longGrothFactor = 1 + (longGrothPercent/100);

    return discountedCashFlowInTenthYear * longGrothFactor / discountFactor;
  }
}
