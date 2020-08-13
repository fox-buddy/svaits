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

    return (marktKapitalisierungStichtag / earningsAfterTaxStichtag) * 100;
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
    return (eigenkapital + gesamtVerbindlichkeiten + zahlungsmittel) * buchwertRelation;
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
}
