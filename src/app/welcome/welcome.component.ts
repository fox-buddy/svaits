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
      heading: "Basis Bewertung", description: "Grundlegende simple Bewertungskennzahlen, sowie finanzielle Stabilität des Unternehmens", cols: 1, rows: 2
    },
    {
      heading: "Discounted Cash Flow", description: "Zeigt den inneren Wert des Unternehmens auf Basis der Free Cash Flows oder den Funds from Operations (REIT)", cols: 1, rows: 2
    },
    {
      heading: "Notizen und Basisfragen", description: "Fragen, denen man sich vor einem Investment stellen sollte", cols: 1, rows: 2
    },
    {
      heading: "Speichern und Exportieren der Bewertungen", description: "Ohne Anmeldung lokal im Browser Speichern und Laden (Icons in der Toolbar)", cols: 1, rows: 2
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
