import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { GoogleSheetsComponent } from './components/google-sheets/google-sheets.component';

const routes: Routes = [
  {path:'', component:GridComponent},
  {path:'google', component:GoogleSheetsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
