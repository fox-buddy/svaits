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

  operativerCashflowInMillionenZumStichtag: number;
  operativerCashflowDescription: string; //Done CF

  operativerCashflowThreeYearAverageInMillionen: number;
  operativerCashflowThreeYearAverageDescription: string; //Done CF

  investmentCashflowInMillionenZumStichtag: number;
  investmentCashflowDescription: string; //Done CF

  investmentCashflowThreeYearAverageInMillionen: number;
  investmentCashflowThreeYearAverageDescription: string; //Done CF

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
