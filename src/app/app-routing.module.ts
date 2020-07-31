import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { InfoComponent } from './info/info.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';

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
    path: '**',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
