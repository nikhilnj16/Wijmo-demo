import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import * as wjGrid from '@mescius/wijmo.angular2.grid';
import { WjGridFilterModule } from '@mescius/wijmo.angular2.grid.filter';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleSheetsComponent } from './components/google-sheets/google-sheets.component';

import { WjInputModule } from '@mescius/wijmo.angular2.input';
import { WjGridModule } from '@mescius/wijmo.angular2.grid';
import { WjChartModule } from '@mescius/wijmo.angular2.chart';
import { FormsModule } from '@angular/forms';
import { WjGridSearchModule } from '@mescius/wijmo.angular2.grid.search';
import { WjGridGrouppanelModule } from '@mescius/wijmo.angular2.grid.grouppanel';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GoogleSheetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    wjGrid.WjGridModule,
    WjGridFilterModule,
    WjInputModule, WjGridModule, WjChartModule, FormsModule, WjGridSearchModule,  WjGridGrouppanelModule,   HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
