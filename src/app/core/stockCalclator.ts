import { IDCFGrothRates, ILiquidsAndInterests } from '../core/IStockData';

export class StockCalculator {
  static calculateEigenKapitalQuoteWith(eigenkapital: number, bilanzSumme: number) {
    if(bilanzSumme === 0) {
      return 0;
    }

    return (eigenkapital/bilanzSumme) * 100;
  }

  static calculateGearintQuoteWith(gesamtVerbindlichkeiten: number, liquideMittel: number, eigenkapital: number) {
    if(eigenkapital === 0) {
      return 0;
    }

    return ((gesamtVerbindlichkeiten - liquideMittel)/eigenkapital) * 100;
  }

  static calculateDynamischerVerschuldungsgrad(
    gesamtVerbindlichkeiten: number
    , liquideMittel: number
    , freeCashFlowStichtag: number
  ) {
    if(freeCashFlowStichtag === 0) {
      return 0;
    }

    return (gesamtVerbindlichkeiten - liquideMittel)/freeCashFlowStichtag;
  }

  static calculateSachInvestitionsquote(
    cashFlowInvestMent: number
    , operativerCashFlow: number
  ) {
    if(operativerCashFlow === 0) {
      return 0;
    }

    return (cashFlowInvestMent/operativerCashFlow) * 100;
  }

  static calculateEigenkapitalRenditeWith(
    earningsAfterTaxStichtag: number
    , threeYearAverageEigenkapital: number
  ) {
    if(threeYearAverageEigenkapital === 0) {
      return 0;
    }

    return (earningsAfterTaxStichtag/threeYearAverageEigenkapital) * 100;
  }

  static calculateEbitMargeWith(
    earningsBeforeInterestsAndTaxStichtag: number
    , umsatzerloeseStichtag: number
  ) {
    if(umsatzerloeseStichtag === 0) {
      return 0;
    }

    return (earningsBeforeInterestsAndTaxStichtag/umsatzerloeseStichtag) * 100;
  }

  static calculateIntrinsischeKaufdauerWith(
    marktKapitalisierungStichtag: number
    , freeCashFlowThreeYearAverage: number
  ) {
    if(freeCashFlowThreeYearAverage === 0) {
      return 0;
    }

    return marktKapitalisierungStichtag / freeCashFlowThreeYearAverage;
  }

  static calculateKursGewinnVerhaeltnisWith(
    marktKapitalisierungStichtag: number
    , earningsAfterTaxStichtag: number
  ) {
    if(earningsAfterTaxStichtag === 0) {
      return 0;
    }

    return (marktKapitalisierungStichtag / earningsAfterTaxStichtag);
  }

  static calculateEinstandsRenditeWith(
    marktKapitalisierungStichtag: number
    , earningsAfterTaxStichtag: number
  ) {
    if(marktKapitalisierungStichtag === 0) {
      return 0;
    }

    return (earningsAfterTaxStichtag / marktKapitalisierungStichtag) * 100;
  }

  static calculateKursBuchwertVerhaeltnisWith(
    marktKapitalisierungStichtag: number
    , eigenkapital: number
  ) {
    if(eigenkapital === 0) {
      return 0;
    }

    return marktKapitalisierungStichtag/eigenkapital
  }

  static calculateEnterpriseValueStichtagWith(
    buchwertRelation: number
    , eigenkapital: number
    , gesamtVerbindlichkeiten: number
    , zahlungsmittel: number
  ) {
    return (eigenkapital + gesamtVerbindlichkeiten - zahlungsmittel) * buchwertRelation;
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

    return sumOfGroth/ratesOfGroth.length;
  }

  static calculateFairStockValue(discountedCFCompanyValue: number, liquidsAndInterests: ILiquidsAndInterests, anzahlAktien: number) {
    let companyValue = (discountedCFCompanyValue + (liquidsAndInterests.liquideMittel - liquidsAndInterests.schulden)) * 1000000;
    const valuePerStock = companyValue / anzahlAktien;

    return valuePerStock;
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

    return {companySum: discountedCashFlowSum, lastValue: discountedCashFlows[futureCashFlowArray.length-1]};
  }

  static calculateDiscountedCashFlowRestwert(discountedCashFlowInTenthYear: number,longGrothPercent:number, expectedRateOfReturnPercent: number) {
    const discountFactor = (expectedRateOfReturnPercent- longGrothPercent) / 100;
    const longGrothFactor = 1 + (longGrothPercent/100);

    return discountedCashFlowInTenthYear * longGrothFactor / discountFactor;
  }
}
