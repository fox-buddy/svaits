import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { InfoComponent } from './info/info.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { StockDataCalculationComponent } from './stock-data-calculation/stock-data-calculation.component';
import { StockDataOverviewComponent } from './stock-data-overview/stock-data-overview.component';
import { StockCommentComponent } from './stock-comment/stock-comment.component';
import { StockSummaryComponent } from './stock-summary/stock-summary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'disclaimer',
    component: DisclaimerComponent
  },
  {
    path: 'contact',
    component: ContactpageComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'overview',
    component: StockOverviewComponent
  },
  {
    path: 'summary/:stockname/:stockindex',
    component: StockSummaryComponent
  },
  {
    path: 'comment/:stockname/:stockindex',
    component: StockCommentComponent
  },
  {
    path: 'calculation/:stockname/:stockindex',
    component: StockDataCalculationComponent
  },
  {
    path: 'stockoverview/:stockname/:stockindex',
    component: StockDataOverviewComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
