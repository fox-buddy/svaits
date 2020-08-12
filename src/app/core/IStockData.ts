export interface IStockResults {
  fairValue: Number;
  eigenkapitalquote: Number;
}

export interface IStockInputs {

}

export interface IStock {
  stockName: string;
  inputData: IStockInputs;
  resultData: IStockResults;
}
