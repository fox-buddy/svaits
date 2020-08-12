export interface IStockResults {
  fairValue: number;
  eigenkapitalquote: number;
}

export interface IStockInputs {
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
