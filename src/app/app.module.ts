import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

import { MatGridListModule } from '@angular/material/grid-list';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { InfoComponent } from './info/info.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { StockNamingDialogComponent } from './stock-naming-dialog/stock-naming-dialog.component';
import { StockDataCalculationComponent } from './stock-data-calculation/stock-data-calculation.component';
import { StockDataCalcDetailComponent } from './stock-data-calc-detail/stock-data-calc-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    InfoComponent,
    DisclaimerComponent,
    ContactpageComponent,
    StockOverviewComponent,
    StockNamingDialogComponent,
    StockDataCalculationComponent,
    StockDataCalcDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatGridListModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,

    ReactiveFormsModule,
    FormsModule,

    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
