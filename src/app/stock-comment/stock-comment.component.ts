import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IStock } from '../core/IStockData';
import { StockService } from '../core/stock.service';
import { Editor, toHTML, toDoc } from 'ngx-editor';

@Component({
  selector: 'app-stock-comment',
  templateUrl: './stock-comment.component.html',
  styleUrls: ['./stock-comment.component.css']
})
export class StockCommentComponent implements OnInit, OnDestroy {

  public stockName: string;
  public stockIndex: number;
  public stockInWork: IStock;

  public editor: Editor;
  html: any;
  private defaultQuestions = "<h2>Was spricht für das Investment. Welche Chancen und Stärken kann ich finden?</h2><p></p><h2>Was spricht gegen das Investment bzw. welche Gefahren oder Schwächen gibt es?</h2><p></p><h2>Gab es in letzter Zeit Insider Trades? Wenn ja, wie sind diese zu werten?</h2><p></p><h2>Kommentar zum Jockey oder dem Vorstand allgemein?</h2><p></p><h2>zeitlicher Horizont der Investition?</h2>"

  constructor(private route: ActivatedRoute, private _stockSrv: StockService, private location: Location) {
    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));

  }

  public navigateBack() {
    this.location.back();
  }

  public saveText() {
    console.log(this.html);
    let htmlText = toHTML(this.html);
    this._stockSrv.stockCollection[this.stockIndex].inputData.stockComment = htmlText;
    debugger;
  }

  public pasteDefaultQuestions() {
    let htmlText = toHTML(this.html);
    htmlText += "<br>";
    htmlText += this.defaultQuestions;
    this.html = toDoc(htmlText);
  }

  ngOnInit(): void {
    this.editor = new Editor();
    if(this._stockSrv.stockCollection[this.stockIndex].inputData.stockComment) {
      this.html = toDoc(this._stockSrv.stockCollection[this.stockIndex].inputData.stockComment);
    }
  }

  ngOnDestroy() {
    this.editor.destroy();
  }

}
