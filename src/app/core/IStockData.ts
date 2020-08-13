export interface IStockResults {

  eigenkapitalquote: number;
  eigenkapitalquoteDescription: string;

  gearing: number;
  gearingdescription: string;

  dynamischerVerschuldungsgrad: number;
  dynamischerVerschuldungsgradDescription: string;

  sachinvestitionsQuote: number;
  sachinvestitionsQuoteDescription: string;

  eigenkapitalThreeYearAverageRendite: number;
  eigenkapitalThreeYearAverageRenditeDescription: string;

  ebitMarge: number;
  ebitMargeDescription: string;

  intrinsischeKaufdauer: number;
  intrinsischeKaufdauerDescription: string;

  kursGewinnVerhaeltnisZumStichtag: number
  kursGewinnVerhaeltnisZumStichtagDescription: string;

  einstandsrenditeZumStichtag: number
  einstandsrenditeZumStichtagDescription: string;

  kursBuchwertVerhaeltnisZumStichtag: number;
  kursBuchwertVerhaeltnisZumStichtagDescription: string;

  enterpriseValueZumStichtag: number;
  enterpriseValueZumStichtagDescription: string;

  expectedRateOfGrothPercent: number;
  expectedRateOfGrothPercentDescription: string;

  sumOfDiscountedCashFlows: number;
  endValue: number;
  nettoCash: number;

  fairValue: number;
  fairValueWithSecurityMargin: number;
  fairValueDescription: string;
}

export interface IStockInputs {
  anzahlAktien: number;
  anzahlAktienDescription: string;

  bilanzSummeInMillionenZumStichtag: number;
  bilanzSummeDescription: string;

  eigenKapitalInMillionenZumStichtag: number;
  eigenKapitalDescription: string;

  eigenKapitalThreeYearAverageInMillionen: number;
  eigenKapitalThreeYearAverageDescription: string;

  gesamtVerbindlichKeitenInMillionenZumStichtag: number;
  gesamtVerbindlichKeitenDescription: string;

  zahlungsMittelInMillionenZumStichtag: number;
  zahlungsMittelDescription: string;

  operativerCashflowInMillionenZumStichtag: number;
  operativerCashflowDescription: string;

  operativerCashflowThreeYearAverageInMillionen: number;
  operativerCashflowThreeYearAverageDescription: string;

  investmentCashflowInMillionenZumStichtag: number;
  investmentCashflowDescription: string;

  investmentCashflowThreeYearAverageInMillionen: number;
  investmentCashflowThreeYearAverageDescription: string;

  umsatzInMillionenZumStichtag: number;
  umsatzInMillionenDescription: string;

  ebitInMillionenZumStichtag: number;
  ebitDescription: string;

  eatInMillionenZumStichtag: number;
  eatDescription: string;

  marktKapitalisierungInMillionenZumStichtag: number;
  marktKapitalisierungDescription: string;

  umsatzChangeFirstPeriod: number;
  umsatzChangeSecondPeriod: number;
  umsatzChangeThirdPeriod: number;
  umsatzChangeFourthPeriod: number;
  umsatzChangeFifthPeriod: number;
  umsatzChangeSixthPeriod: number;
  umsatzChangeDescription: string;

  expectedRateOfGrothPercent: number;
  expectedRateOfGrothPercentDescription: string;

  expectedRateOfReturnPercent: number;
  expectedRateOfReturnDescription: string;

  expectedLongGrowRatePercent: number;
  expectedLongGrowRateDescription: string;

  securityMarginRate: number;
  securityMarginDescription: string;
}

export interface IStock {
  stockName: string;
  inputData: IStockInputs;
  resultData: IStockResults;
}
