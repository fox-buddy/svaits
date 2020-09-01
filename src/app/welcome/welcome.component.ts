import { Component, OnInit, setTestabilityGetter } from '@angular/core';

interface IPageHints {
  heading: string;
  description: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public pageHints: IPageHints[] = [
    {
      heading: "Anzeige der finanziellen Stabilität", description: "Kennzahlen zur Wirtschaftlichkeit des Unternehmens", cols: 4, rows: 2
    },
    {
      heading: "Ertrag und Rentabilität", description: "Kennzahlen zur Rentabilität wie Eigenkapitalrendite, EBIT-Marge und intrinsische Kaufdauer", cols: 4, rows: 2
    },
    {
      heading: "Basis Bewertung", description: "Grundlegende simple Bewertungskennzahlen wie KGV, Einstandsrendite und KBV", cols: 4, rows: 2
    },
    {
      heading: "Discounted Cash Flow", description: "Zeigt den inneren Wert des Unternehmens auf Basis der Free Cash Flows", cols: 4, rows: 2
    }
  ];
  private pageHintsTemplateFillInterval: any;
  private lenOfPageHints: number;
  private currentItem: number = 0;

  public pageHintsForTemplate: IPageHints[] = [];
  public showFooterText: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.fillPageHintsForTemplate();
  }

  private fillPageHintsForTemplate() {
    this.lenOfPageHints = this.pageHints.length;

    this.pageHintsTemplateFillInterval = setInterval(() => {
      this.pageHintsForTemplate.push(this.pageHints[this.currentItem]);
      this.currentItem += 1

      if(this.currentItem >= this.lenOfPageHints) {
        this.clearPageFillInterval();
      }
    }, 1000);
  }

  private clearPageFillInterval() {

    this.showFooterText = true;
    clearInterval(this.pageHintsTemplateFillInterval);

  }
}
