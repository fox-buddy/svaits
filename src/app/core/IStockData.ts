export interface IStockResults {

  eigenkapitalquote: number;  //Done BilanzResults
  eigenkapitalquoteDescription: string;

  gearing: number; //Done BilanzResults
  gearingdescription: string;

  dynamischerVerschuldungsgrad: number;  //Done
  dynamischerVerschuldungsgradDescription: string;

  sachinvestitionsQuote: number;  //Done
  sachinvestitionsQuoteDescription: string;

  eigenkapitalThreeYearAverageRendite: number;  //Done
  eigenkapitalThreeYearAverageRenditeDescription: string;

  ebitMarge: number; //Done
  ebitMargeDescription: string;

  intrinsischeKaufdauer: number; //Done
  intrinsischeKaufdauerDescription: string;

  kursGewinnVerhaeltnisZumStichtag: number //Done
  kursGewinnVerhaeltnisZumStichtagDescription: string;

  einstandsrenditeZumStichtag: number //Done
  einstandsrenditeZumStichtagDescription: string;

  kursBuchwertVerhaeltnisZumStichtag: number; //Done
  kursBuchwertVerhaeltnisZumStichtagDescription: string;

  enterpriseValueZumStichtag: number; //Done
  enterpriseValueZumStichtagDescription: string;

  expectedRateOfGrothPercent: number; //Done
  expectedRateOfGrothPercentDescription: string;

  sumOfDiscountedCashFlows: number;
  endValue: number;
  nettoCash: number;

  fairValue: number;
  fairValueWithSecurityMargin: number;
  fairValueDescription: string;

  navPerStock: number;
  navPerStockDescription: string;
}

export interface IStockInputs {
  typeOfStock: number;
  typeOfStockDescription: string;

  currencyCode: string;
  currencyCodeDescription: string;

  anzahlAktien: number;
  anzahlAktienDescription: string;  //Done Bilanz

  bilanzSummeInMillionenZumStichtag: number;
  bilanzSummeDescription: string; //Done Bilanz

  eigenKapitalInMillionenZumStichtag: number;
  eigenKapitalDescription: string; //Done Bilanz

  eigenKapitalThreeYearAverageInMillionen: number;
  eigenKapitalThreeYearAverageDescription: string; //Done Bilanz

  gesamtVerbindlichKeitenInMillionenZumStichtag: number;
  gesamtVerbindlichKeitenDescription: string; //Done Bilanz

  zahlungsMittelInMillionenZumStichtag: number;
  zahlungsMittelDescription: string; //Done Bilanz

  manualGrowth: boolean;

  operativerCashflowInMillionenZumStichtag: number;
  operativerCashflowDescription: string; //Done CF

  operativerCashflowForDcf: number;
  operativerCashflowForDcfDescription: string; //Done CF

  investmentCashflowInMillionenZumStichtag: number;
  investmentCashflowDescription: string; //Done CF

  investmentCashflowForDcf: number;
  investmentCashflowForDcfDescription: string; //Done CF

  fundsFromOperationsDescription: string;

  umsatzInMillionenZumStichtag: number;
  umsatzInMillionenDescription: string; //Done Bilanz

  ebitInMillionenZumStichtag: number;
  ebitDescription: string;  //Done Bilanz

  eatInMillionenZumStichtag: number;
  eatDescription: string;   //Done Bilanz

  marktKapitalisierungInMillionenZumStichtag: number;
  marktKapitalisierungDescription: string;  //Done Bilanz

  umsatzChangeFirstPeriod: number; //Done
  umsatzChangeSecondPeriod: number; //Done
  umsatzChangeThirdPeriod: number; //Done
  umsatzChangeFourthPeriod: number; //Done
  umsatzChangeFifthPeriod: number; //Done
  umsatzChangeSixthPeriod: number; //Done
  umsatzChangeDescription: string; //Done

  expectedRateOfGrothPercent: number; //Wird errechnet, kann überschrieben werden
  expectedRateOfGrothPercentDescription: string;

  expectedRateOfReturnPercent: number;
  expectedRateOfReturnDescription: string; //Done CF

  expectedLongGrowRatePercent: number;
  expectedLongGrowRateDescription: string; //Done CF

  securityMarginRate: number;
  securityMarginDescription: string;
}

export interface IStock {
  stockName: string;
  inputData: IStockInputs;
  resultData: IStockResults;
}

export interface IDCFGrothRates {
  expectedRateOfGrowthPercent:number;
  expectedRateOfReturnPercent: number;
  longGrothPercent: number;
}

export interface ILiquidsAndInterests {
  liquideMittel: number;
  schulden: number;
}
