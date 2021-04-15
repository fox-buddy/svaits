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
  private defaultQuestions = "<h2>A) Was spricht für das Investment. Welche Chancen und Stärken kann ich finden?</h2><p></p><h2>B) Was spricht gegen das Investment bzw. welche Gefahren oder Schwächen gibt es?</h2><p></p><h2>C) Gibt es aktuell einen Burggraben oder wird es in Zukunft mit hoher Wahrscheinlichkeit einen oder mehrere Gräben geben?</h2><p></p><h2>D) Gab es in letzter Zeit Insider Trades? Wenn ja, wie sind diese zu werten?</h2><p></p><h2>E) Kommentar zum Jockey oder dem Vorstand allgemein?</h2><p></p><h2>F) zeitlicher Horizont der Investition?</h2><p></p><h2>G) Wie bin ich auf die Aktie aufmerksam geworden bzw. warum will ich genau jetzt investieren? Unterliege ich einem Priming Effekt?</h2><p></p><h2>H) Wie reagiere ich wenn die Aktie plötzlich 15% bis 20% an Wert verliert?</h2><p></p><h2>I) Wo sehe ich das Unternehmen in 5-10 Jahren (Sofern E mit einem zeitlichen Horizont von mehr als 5 Jahren beantwortet wurde)?</h2><p></p><h2>J) Wie reagiere ich, wenn die Aktie plötzlich 50% bis 70% an Wert gewinnt?</h2>";

  constructor(private route: ActivatedRoute, private _stockSrv: StockService, private location: Location) {
    this.stockName = this.route.snapshot.paramMap.get('stockname');
    this.stockIndex = Number(this.route.snapshot.paramMap.get('stockindex'));

  }

  public navigateBack() {
    this.location.back();
  }

  public saveText() {
    console.log("change");
    let htmlText = toHTML(this.html);
    this._stockSrv.stockCollection[this.stockIndex].inputData.stockComment = htmlText;

  }

  public pasteDefaultQuestions() {

    let htmlText = (this.html) ? toHTML(this.html) : '';
    htmlText += "<br>";
    htmlText += this.defaultQuestions;

    this.html = toDoc(htmlText);
  }

  ngOnInit(): void {
    this.editor = new Editor();
    if(this._stockSrv.stockCollection[this.stockIndex]) {
      if(this._stockSrv.stockCollection[this.stockIndex].inputData.stockComment) {
        this.html = toDoc(this._stockSrv.stockCollection[this.stockIndex].inputData.stockComment);
      }
    }
  }

  ngOnDestroy() {
    this.editor.destroy();
  }

}
